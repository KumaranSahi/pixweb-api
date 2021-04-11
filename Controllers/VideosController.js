const {astroPhotographyData,basicCameraUsageData}=require('../IntialData/initialData')

module.exports.SendAllVideos=(req,res)=>{
    res.json(basicCameraUsageData)
}