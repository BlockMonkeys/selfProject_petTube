import Video from "../model/Video";
import _ from 'lodash';


export const search = async(req, res) => {
    const searchingBy = req.query.searchingBy;
    const searchedVideo = await Video.find({ 
        title: { $regex: searchingBy, $options: "i" }
    });
    const searchedVideo2 = await Video.find({
        description: { $regex: searchingBy, $options: "x"}
    });
    const searched = searchedVideo.concat(searchedVideo2);
    const searchedResult = _.uniqBy(searched, "id");
    res.render('search', { searchedResult, pageTitle: searchingBy })
}