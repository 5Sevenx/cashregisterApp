using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cashreg.Data;
using cashreg.Models;
using cashreg.Models.DTOS;
using System.Linq;
using System.Net.Sockets;

namespace cashreg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _cont;

        public ProductController(DataContext context)
        {
            _cont = context;
        }

        //-----------------------------------------------------------------------------------------GETTERS----------------------------------------------------------------------------------------------------

                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL PRODUCTS++++++++++++++++++++++++++++++++++++++++++
                [HttpGet]
                public async Task<ActionResult<List<ProductsDTO>>> GetAllProducts()
                {
                    var product = await _cont.Products.ToListAsync();
                    List<ProductsDTO> productsDTOs = product.Select(item => new ProductsDTO() { ID = item.ID, name = item.name, price = item.price }).ToList();
                    return Ok(productsDTOs);
                }
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL TICKETS++++++++++++++++++++++++++++++++++++++++++++
                [HttpGet("ticket")]
                public async Task<ActionResult<List<TicketDTO2>>> GetAllTickets()
                {

                    var ticket = await _cont.Tickets.Include(t => t.Store).ToListAsync();

                    List<TicketDTO2> ticketDtos = ticket.Select(i => new TicketDTO2()
                    {
                        ID = i.ID,
                        Price = i.Price,
                        Date = i.Date,
                        Store = new StoreDTO() { ID_Store = i.Store.ID_Store, Name = i.Store.Name }
                    }).ToList();

                    return Ok(ticketDtos);
                }
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL TOTALS++++++++++++++++++++++++++++++++++++++++++++
                [HttpGet("total")]
                public async Task<ActionResult<List<TotalProductLinkDTO2>>> GetAllTotal()
                {
                    var total = await _cont.TotalProductLinks.ToListAsync();
                    List<TotalProductLinkDTO2> totalDtos = total.Select(i => new TotalProductLinkDTO2() { Product_ID = i.Product_ID, Total_Id = i.Total_Id, Amount = i.Amount, Price = i.Price }).ToList();
                    return Ok(totalDtos);
                }
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL STORES++++++++++++++++++++++++++++++++++++++++++++
                [HttpGet("store")]
                public async Task<ActionResult<List<StoreDTO>>> GetAllStores()
                {
                    var stores = await _cont.Stores.ToArrayAsync();
                    List<StoreDTO> storesDto = stores.Select(i => new StoreDTO() { ID_Store = i.ID_Store, Name = i.Name }).ToList();
                    return Ok(storesDto);
                }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        [HttpGet("link")]
        public async Task <ActionResult<List<LinkDTO2>>> GetAllLink()
        {
            var links = await _cont.LinkStores.ToArrayAsync();
            List<LinkDTO2> linkDTOs = links.Select(i => new LinkDTO2() { ID_Product = i.ID_Product, ID_Store = i.ID_Store }).ToList();
            return Ok(linkDTOs);
        }

        [HttpGet("linkbyid")]
        public async Task<ActionResult> GetByStore([FromQuery] int idstore)
        {
            var store = await _cont.Stores.FirstOrDefaultAsync(s => s.ID_Store == idstore);

            if (store == null)
            {
                return NotFound($"Store with ID {idstore} not found.");
            }

            var linkedProductIds = await _cont.LinkStores
                .Where(ls => ls.ID_Store == idstore)
                .Select(ls => ls.ID_Product)
                .ToListAsync();

            if (!linkedProductIds.Any())
            {
                return NotFound($"No products linked to store with ID {idstore}.");
            }

            var products = await _cont.Products
                .Where(p => linkedProductIds.Contains(p.ID))
                .Select(p => new
                {
                    ID = p.ID,
                    name = p.name
                })
                .ToListAsync();

            var result = new
            {
                StoreName = store.Name,
                Products = products
            };

            return Ok(result);
        }



        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


        //-----------------------------------------------------------------------------------------SETTERS----------------------------------------------------------------------------------------------------

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++CREATE TICKET++++++++++++++++++++++++++++++++++++++++++++
        [HttpPost("create-ticket")]
                public async Task<IActionResult> CreateTicketWithProducts([FromBody] CreateTicketDTO ticketDto)
                {
                    if (ticketDto.ProductList == null || !ticketDto.ProductList.Any())
                        return BadRequest("No products provided in the request.");

                    // Fetch product details
                    var productIds = ticketDto.ProductList.Select(p => p.IdProduct).ToList();
                    var products = await _cont.Products
                        .Where(p => productIds.Contains(p.ID))
                        .Select(p => new ProductsDTO
                        {
                            ID = p.ID,
                            name = p.name,
                            price = p.price
                        }).ToListAsync();

                    if (!products.Any())
                        return BadRequest("Invalid product IDs provided.");

                    // Fetch store information
                    var store = await _cont.Stores
                        .Where(s => s.ID_Store == ticketDto.ID_Store)
                        .FirstOrDefaultAsync();
                    if (store == null)
                        return BadRequest("Invalid store ID provided.");

                    // Calculate total amount and price
                    int totalAmount = ticketDto.ProductList.Sum(p => p.Amount);
                    double totalPrice = ticketDto.ProductList.Sum(product =>
                    {
                        var matchingProduct = products.FirstOrDefault(p => p.ID == product.IdProduct);
                        return matchingProduct != null ? matchingProduct.price * product.Amount : 0;
                    });

                    // Build TotalProductLinks
                    var totalProductLinks = ticketDto.ProductList.Select(product => new TotalProductLink
                    {
                        Product_ID = product.IdProduct,
                        Amount = product.Amount,
                        Price = products.FirstOrDefault(p => p.ID == product.IdProduct)?.price ?? 0,
                    }).ToList();

                    // Create Ticket object
                    var ticket = new Ticket
                    {
                        Date = DateTime.Now,
                        Price = totalPrice,
                        TotalProductLinks = totalProductLinks,
                        ID_Store = ticketDto.ID_Store,
                        Store = store
                    };

                    // Save to the database
                    _cont.Tickets.Add(ticket);
                    await _cont.SaveChangesAsync();

                    // Prepare response DTO
                    var ticketDtoResult = new TicketDto
                    {
                        Id = ticket.ID,
                        Price = ticket.Price,
                        Date = ticket.Date,
                        Store = new StoreDTO
                        {
                            ID_Store = store.ID_Store,
                            Name = store.Name
                        },
                        TotalProductLinks = totalProductLinks.Select(link => new TotalProductLinkDto
                        {
                            ProductId = link.Product_ID,
                            ProductName = products.First(p => p.ID == link.Product_ID).name,
                            Amount = link.Amount,
                            Price = link.Price
                        }).ToList()
                    };

                    return Ok(ticketDtoResult);
                }

                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++CREATE STORE++++++++++++++++++++++++++++++++++++++++++++
                [HttpPost("create-store")]
                public async Task<IActionResult> CreateStoreWithProducts([FromBody] StoreDTO storeDTO)
                {
                    //take name equal to introduced name to verify if exist
                    var stores = await _cont.Stores.Where(i => i.Name == storeDTO.Name).ToArrayAsync();

                    if (stores.Any())
                    {
                        return BadRequest("Store with that name already exist");
                    }

                    //save it in data base,id autoincremented 
                    var newStore = new Store
                    {
                        Name = storeDTO.Name,
                    };

                    await _cont.Stores.AddAsync(newStore);
                    await _cont.SaveChangesAsync();

                    //return dto
                    var newStoreDTO = new StoreDTO
                    {
                        ID_Store = newStore.ID_Store,
                        Name = newStore.Name
                    };

                    return Ok(newStoreDTO);
                }

                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++CREATE STORE++++++++++++++++++++++++++++++++++++++++++++
                [HttpPost("create-product")]
                public async Task<IActionResult> CreateProduct([FromBody] ProductsDTO productsDTO)
                {
                    var products = await _cont.Products.Where(i => i.name == productsDTO.name).ToArrayAsync();

                    if (products.Any())
                    {
                        return BadRequest("Product with that name already exist");
                    }

                    var newProduct = new Product
                    {
                        name = productsDTO.name,
                        price = productsDTO.price
                    };

                    await _cont.Products.AddAsync(newProduct);
                    await _cont.SaveChangesAsync();

                    var newProductDto = new ProductsDTO
                    {
                        ID = newProduct.ID,
                        name = newProduct.name,
                        price = newProduct.price
                    };

                    return Ok(newProductDto);
                }

                //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                [HttpPost("create-link-to-store")]
                public async Task<IActionResult> CreateLinkToProducts([FromBody] LinkStoreDTO linkStoreDTO)
                {
                    // Validate store
                    var store = await _cont.Stores.FirstOrDefaultAsync(s => s.ID_Store == linkStoreDTO.ID_Store);
                    if (store == null)
                        return BadRequest("Invalid store ID provided.");

                    // Validate product IDs
                    var productIds = linkStoreDTO.ID_Product.Select(p => p.ID_Product).ToList();
                    var products = await _cont.Products.Where(p => productIds.Contains(p.ID)).ToListAsync();
                    if (products.Count != productIds.Count)
                        return BadRequest("One or more product IDs are invalid.");

                    // Create LinkStore entries
                    var linkStores = linkStoreDTO.ID_Product.Select(p => new LinkStore
                    {
                        ID_Product = p.ID_Product,
                        ID_Store = linkStoreDTO.ID_Store
                    }).ToList();

                    await _cont.LinkStores.AddRangeAsync(linkStores);
                    await _cont.SaveChangesAsync();

                    // Prepare response DTO
                    var newLinksDTO = linkStores.Select(ls => new LinkStoreDTO
                    {
                        ID_Store = ls.ID_Store,
                        ID_Product = new List<IdsAmount> { new IdsAmount { ID_Product = ls.ID_Product } }
                    }).ToList();

                    return Ok(newLinksDTO);
                }


        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    }
}
