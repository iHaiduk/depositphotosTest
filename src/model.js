/**
 * Created by igor on 19.02.17.
 */

import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = Promise;
mongoose.connect(config.db);

export default mongoose.model('Todo', {
    list: [
        {
            text: String,
            time: {
                type: Date,
                default: Date.now
            },
            done: {
                type: Boolean,
                default: false
            }
        }
    ],
    userId: String
});
