using System.ComponentModel.DataAnnotations.Schema;

namespace cashreg.Models
{
    [Table("Ticket")]
    public class Ticket
    {
        
        public int ID { get; set; }

        public double Price { get; set; }

        public DateTime Date { get; set; }

        public int ID_Store { get; set; }

        public Store Store { get; set; }

        //contect with TotalProductLink table
        public List<TotalProductLink> TotalProductLinks { get; set; }

    }
}
