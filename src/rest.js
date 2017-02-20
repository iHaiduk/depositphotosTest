/**
 * Created by igor on 19.02.17.
 */
import Todo from './model';
export default (router, app) => {
    router.route('/list')
        .get(async(req, res) => {
            const list = await Todo.findOne({userId: req.cookies.session}).lean().exec() || { list: [] };
            return res.json(list);
        });

    router.route('/todo')
        .put(async(req, res) => {
            const {text} = req.body;
            try {
                await Todo.update({userId: req.cookies.session}, {
                    $set: {
                        userId: req.cookies.session
                    },
                    $push: {
                        list: {text}
                    }
                }, {upsert: true, multi: true}).exec();
                const answer = await Todo.findOne({userId: req.cookies.session}).select('list').exec();
                return res.json(answer.list.pop());
            } catch (error) {
                return res.json(error);
            }
        })
        .delete(async(req, res) => {
            try {
                await Todo.update({userId: req.cookies.session}, {$pull: {list: {done: true}}}).exec();
                res.json({result: true});
            } catch (error) {
                return res.json(error);
            }
        });

    router.route('/todo/:id')
        .post(async(req, res) => {
            const _id = req.params.id;
            const {text} = req.body || {};
            try {
                const $set = {};
                const answer = await Todo.findOne({userId: req.cookies.session}).select('list').exec();
                const index = answer.list.findIndex(v => String(v._id) === _id);
                let value;
                if (index !== -1) {
                    if (text != null) {
                        $set[`list.${index}.text`] = text;
                    } else {
                        value = !answer.list[index].done;
                        $set[`list.${index}.done`] = value;
                    }
                    await Todo.update({userId: req.cookies.session}, {$set}).exec();
                    return res.json({done: value, _id, text});
                }
            } catch (error) {
                return res.json(error);
            }
        })
        .delete(async(req, res) => {
            const _id = req.params.id;
            try {
                const answer = await Todo.findOne({userId: req.cookies.session}).select('list').exec();
                const index = answer.list.findIndex(v => String(v._id) === _id);
                answer.list.splice(index, 1);
                await Todo.update({userId: req.cookies.session}, {$set: {list: answer.list}}).exec();
                res.json({index});
            } catch (error) {
                return res.json(error);
            }
        });

    app.use('/api', router);
};
