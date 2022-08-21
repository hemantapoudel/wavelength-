const MCQ = require("../models/mcq.model")
const Test = require("../models/test.model")

const addMCQ = (req, res, next) => {
    let data = req.body;
    try {
        let mcq = new MCQ(data)
        mcq.save()
        res.json({ result: mcq, msg: "MCQ added successfully" })
    } catch (error) {
        next({ msg: "Error adding mcq" })
    }
}

const addManyMCQ = async (req, res, next) => {
    let data = req.body;
    try {
        let mcqs = await MCQ.insertMany(data)
        res.json({
            msg: `${data.length} MCQs added successfully`,
            result: mcqs,
        })

    } catch (error) {
        next({ msg: "Error adding MCQs" })
    }
}

const listAllMcqs = async (req, res, next) => {
    try {
        let mcqs = await MCQ.find({}).populate({
            path: 'test',
            populate: {
                path: 'course',
                select: 'title'
            }
        }).populate({ path: 'subject', select: 'title' })
        res.json({
            msg: `${mcqs.length} MCQs fetched successfully`,
            result: mcqs
        })
    } catch (error) {
        next({ msg: "Error fetching mcqs" })
    }
}

const fetchMcqs = async (req, res, next) => {
    let data = req.body;
    console.log(data.test)
    try {
        let mcqs = await MCQ.find({ test: data.test }, { correct_ans: 0, solution: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        res.json({
            msg: `${mcqs.length} mcqs fetched`,
            result: mcqs
        })
    } catch (error) {
        next({
            msg: "Error fetching mcqs"
        })
    }
}


const mcqCheck = async (req, res, next) => {
    data = req.body;
    try {
        let mcq = await MCQ.find({ test: data.test }).populate('test')
        let user_data = data.mcqs
        let score = 0;
        let correct_ans = [];
        let incorrect_ans = []
        let null_ans = [];
        let is_negative_marking = mcq[0].test.is_negative_marking

        for (let i = 0; i < mcq.length; i++) {
            if (user_data[i].correct_ans == mcq[i].correct_ans) {
                correct_ans.push(mcq[i])
            } else if (user_data[i].correct_ans == '') {
                null_ans.push(mcq[i])
            } else {
                incorrect_ans.push(mcq[i])
            }
        }

        let total_marks = 0;
        let marks_obtained = 0;
        let negative_marks = 0;
        let unanswered_marks = 0;

        if (is_negative_marking) {
            for (let i = 0; i < correct_ans.length; i++) {
                marks_obtained += Number(correct_ans[i].mark)
            }
            for (let i = 0; i < incorrect_ans.length; i++) {
                negative_marks += (Number(incorrect_ans[i].mark) * 0.1)
            }
            for (let i = 0; i < null_ans.length; i++) {
                unanswered_marks += (Number(null_ans[i].mark))
            }

            total_marks = marks_obtained - negative_marks;

        } else {
            for (let i = 0; i < correct_ans.length; i++) {
                total_marks += Number(correct_ans[i].mark)
            }
        }
        res.json({ msg: `${mcq.length} mcqs fetched`, correct_ans: correct_ans, incorrect_ans: incorrect_ans, 
                    null_ans: null_ans, marks_obtained: marks_obtained, negative_marks: negative_marks, 
                    unanswered_marks: unanswered_marks,total_marks:total_marks })


    } catch (error) {
        next({ msg: "Error checking MCQs" })
    }
}

const updateMcqs = async (req,res,next)=>{
    let data = req.body
    try{
        let result = await MCQ.findByIdAndUpdate(req.params.id,{
            $set:data
        })
        res.json({status:true,msg:"MCQ Updated Successfully"})

    } catch(error){
        next({msg:"Error updating mcq"})
    }
}

const deleteMcqs = async (req,res,next) => {
    let data = req.body
    try{
        let result = await MCQ.findByIdAndDelete(req.params.id)
        res.json({
            msg:"Successfully deleted mcq",
            result:result
        })
    
    } catch(error){
        next({msg:"Error deleting mcqs"})
    }
}



module.exports = { addMCQ, addManyMCQ, listAllMcqs, mcqCheck, fetchMcqs, updateMcqs, deleteMcqs}