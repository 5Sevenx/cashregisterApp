namespace cashreg.Models.DTOS
{
    public class TicketDTO2
    {
        public int ID { get; set; }

        public double Price { get; set; }

        public DateTime Date { get; set; }

        public StoreDTO Store { get; set; }
    }
}
