using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cashreg.Data;
using cashreg.Models;
using cashreg.Models.DTOS;
using System.Linq;

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

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL PRODUCTS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
        [HttpGet]
        public async Task<ActionResult<List<ProductsDTO>>> GetAllProducts()
        {
            var product = await _cont.Products.ToListAsync();
            List<ProductsDTO> productsDTOs = product.Select(item => new ProductsDTO() { ID = item.ID, name = item.name, price = item.price}).ToList();
            return Ok(productsDTOs);
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL TICKETS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
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
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL TOTALS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
        [HttpGet("total")]
        public async Task<ActionResult<List<TotalProductLinkDTO2>>> GetAllTotal()
        {
            var total = await _cont.TotalProductLinks.ToListAsync();
            List<TotalProductLinkDTO2> totalDtos = total.Select(i => new TotalProductLinkDTO2() { Product_ID = i.Product_ID, Total_Id = i.Total_Id, Amount = i.Amount, Price = i.Price }).ToList();
            return Ok(totalDtos);
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET ALL STORES++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
        [HttpGet("store")]
        public async Task<ActionResult<List<StoreDTO>>> GetAllStores()
        {
            var stores = await _cont.Stores.ToArrayAsync();
            List<StoreDTO> storesDto = stores.Select(i => new StoreDTO() { ID_Store = i.ID_Store, Name = i.Name }).ToList();
            return Ok(storesDto);
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

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
    }
}

