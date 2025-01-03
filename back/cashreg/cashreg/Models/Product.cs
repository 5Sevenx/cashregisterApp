﻿using System.ComponentModel.DataAnnotations;
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

    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++MAIN TABLE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}
