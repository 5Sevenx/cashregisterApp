using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using cashreg.Data;
using cashreg.Models;

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


        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var product = await _cont.Products.ToListAsync();
            return Ok(product);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerId(int id)
        {
            var product = await _cont.Products.FindAsync(id);
            if (product is null) return NotFound("Product not found");
            return Ok(product);
        }

    }
}
