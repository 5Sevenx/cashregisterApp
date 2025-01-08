using System.ComponentModel.DataAnnotations.Schema;

namespace cashreg.Models
{
    [Table("Total")]
    public class Ticket
    {
        
        public int ID { get; set; }

        public double Price { get; set; }

        public DateTime Date { get; set; }

        public int Amount { get; set; }

    }
}
