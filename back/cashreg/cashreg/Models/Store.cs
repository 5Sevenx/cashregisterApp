using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cashreg.Models
{
    [Table("Store")]
    public class Store
    {
        [Key]
        public int ID_Store { get; set; }
        public string Name { get; set; }

        //contect with TotalProductLink table
        public List<Ticket> Tickets{ get; set; }
    }
}
