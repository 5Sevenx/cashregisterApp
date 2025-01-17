using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cashreg.Models
{
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++MAIN TABLE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    [Table("Products")]
    public class Product
    {

        
        public int ID { get; set; }

        public string name { get; set; }

        public double price { get; set; }

        //contect with TotalProductLink table
        public virtual List<TotalProductLink> TotalProductLinks { get; set; }
        public virtual ICollection<LinkStore> LinkStores { get; set; }

    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++MAIN TABLE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
