namespace cashreg.Models.DTOS
{
    public class CreateTicketDTO
    {
        public List<ProductAmount> ProductList { get; set; }
        
        
    }

    public class ProductAmount
    { 
    
        public int IdProduct { get; set; }
        public int Amount { get; set; }

    }
}
