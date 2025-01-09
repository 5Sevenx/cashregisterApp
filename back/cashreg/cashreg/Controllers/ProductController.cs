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
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var product = await _cont.Products.ToListAsync();
            return Ok(product);
        }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        [HttpPost("create-ticket")]
        public async Task<IActionResult> CreateTicketWithProducts([FromBody] CreateTicketDTO ticketDto)
        {
            // Validate if ProductLias contains data
            if (ticketDto.ProductList == null || !ticketDto.ProductList.Any())
                return BadRequest("No products provided in the request.");

            // Fetch products based on provided objects in ProductLias
            var productIds = ticketDto.ProductList.Select(p => p.IdProduct).ToList();
            var products = await _cont.Products
                .Where(p => productIds.Contains(p.ID))
                .ToListAsync();

            if (!products.Any())
                return BadRequest("No matching products found in the database.");

            // Calculate total amount and price
            int totalAmount = products.Count; // Assuming 1 quantity per product
            double totalPrice = products.Sum(p => p.price);

            // Build TotalProductLinks
            var totalProductLinks = ticketDto.ProductList.Select(product => new TotalProductLink
            {
                Product_ID = product.IdProduct,
                Amount = product.Amount, // Assuming default amount as 1
                Price = products.FirstOrDefault(item=> item.ID == product.IdProduct).price
            }).ToList();

            // Create the Ticket object
            var ticket = new Ticket
            {
                Date = DateTime.Now,
                Amount = totalAmount,
                Price = totalPrice,
                TotalProductLinks = totalProductLinks
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
                Amount = ticket.Amount,
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

