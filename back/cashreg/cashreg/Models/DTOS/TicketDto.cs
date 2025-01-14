namespace cashreg.Models.DTOS
{
    public class TicketDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public StoreDTO Store { get; set; }
     
        public List<TotalProductLinkDto> TotalProductLinks { get; set; }
    }

    public class TotalProductLinkDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
    }
}
