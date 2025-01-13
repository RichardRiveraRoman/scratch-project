import GeneralInfo from '../models/generalInfoModel.js';

const generalInfoController = {};

generalInfoController.getUserGeneralInfo = async (req, res) => {
  const { userId } = req;
  console.log('Fetching general info for userId:', userId);

  try {
    const generalInfo = await GeneralInfo.findOne({ userId });
    if (!generalInfo) {
      return res.status(404).json({ error: 'General info not found for user' });
    }

    return res.status(200).json({ message: 'General info retrieved', generalInfo });
  } catch (error) {
    console.error('Error fetching general info:', error);
    return res.status(500).json({ error: 'Failed to fetch general info', details: error.message });
  }
};


generalInfoController.createOrUpdateGeneralInfo = async (req, res) => {
  const { userId } = req;
  const { weight, height } = req.body;
  console.log('Creating/updating general info for userId:', userId, { weight, height });

  try {
    
    if (!weight || !height) {
      return res.status(400).json({ error: 'Weight and height are required' });
    }

   
    const BMI = (weight / ((height / 100) ** 2)).toFixed(2);

    
    const generalInfo = await GeneralInfo.findOneAndUpdate(
      { userId },
      { weight, height, BMI },
      { new: true, upsert: true } 
    );

    return res.status(200).json({ message: 'General info updated successfully', generalInfo });
  } catch (error) {
    console.error('Error creating/updating general info:', error);
    return res.status(500).json({ error: 'Failed to create/update general info', details: error.message });
  }
};

generalInfoController.deleteGeneralInfo = async (req, res) => {
  const { userId } = req;
  console.log('Deleting general info for userId:', userId);

  try {
    const deletedInfo = await GeneralInfo.findOneAndDelete({ userId });
    if (!deletedInfo) {
      return res.status(404).json({ error: 'General info not found for user' });
    }

    return res.status(200).json({ message: 'General info deleted successfully' });
  } catch (error) {
    console.error('Error deleting general info:', error);
    return res.status(500).json({ error: 'Failed to delete general info', details: error.message });
  }
};

export default generalInfoController;
