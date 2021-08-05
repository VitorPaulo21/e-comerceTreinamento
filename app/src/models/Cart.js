import mongoose from 'mongoose';
import itemSchema from './Item';

const CartSchema = new mongoose.Schema({
  amount: {
    value: {
      type: Number,
      required: true,
    },
    breakdown: {
      item_total: {
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      shipping: {
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      handling: {
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      shipping_discount: {
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      discount: {
        value: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
  },
  description: {
    type: String,
  },
  items: {
    type: [itemSchema],
    required: true,
  },
  shipping: {
    name: {
      full_name: {
        type: String,
        required: true,
      },
    },
    type: {
      type: String,
      enum: ['SHIPPING', 'PICKUP_IN_PERSON'],
    },
    address: {
      // String number and street
      address_line_1: {
        type: String,
        required: true,
      },
      // Suite or apartament
      address_line_2: {
        type: String,
      },
      // province or state (UK= A county.)
      admin_area_1: {
        type: String,
        required: true,
      },
      // city, town or village
      admin_area_2: {
        type: String,
        required: true,
      },
      //The two-character ISO 3166-1 code that identifies the country or region.
      country_code: {
        type: String,
        maxLength: 2,
        uppercase: true,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
    },
  },
});

export default mongoose.model('orders', CartSchema);
