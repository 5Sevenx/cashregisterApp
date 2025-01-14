namespace cashreg.Models.DTOS
{
    public class TotalProductLinkDTO
    {
        public int Product_ID { get; set; }
        public Product Product { get; set; }
        public int Total_Id { get; set; }
        public Ticket Ticket { get; set; }



        public int Amount { get; set; }
        public double Price { get; set; }
    }
}
