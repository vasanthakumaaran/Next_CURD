
import mongoose, { Schema } from 'mongoose';

// Interface representing your data structure


// Define the Mongoose schema
const topicSchema = new Schema({
        title: String,
        description:String, 
    // You can define more fields here if needed
},{
     timestamps:true,
} 

);

// Create a Mongoose model based on the schema
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default Topic;
