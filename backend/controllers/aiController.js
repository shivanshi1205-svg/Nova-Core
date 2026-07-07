const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.chatWithAI = async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    // Check if API key is provided
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Fallback for demo purposes if no key is set
      return res.status(200).json({ 
        response: `[DEMO MODE - No API Key]: I am the Nova-Core AI. I received your prompt: "${prompt}". Please add a valid GEMINI_API_KEY to your backend .env file to enable real AI responses.` 
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const systemContext = `You are the Nova-Core AI Assistant, a highly advanced business operating system AI. 
    You help users manage projects, analyze data, and optimize team productivity. 
    Maintain a professional, slightly futuristic, and helpful tone.
    Current Context: ${context || 'General workspace inquiry'}`;

    const result = await model.generateContent([
      systemContext,
      prompt
    ]);
    
    const response = await result.response.text();
    
    res.status(200).json({ response });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'AI Processing Error', error: error.message });
  }
};

exports.generateInsights = async (req, res) => {
  // Mock endpoint for generating business insights
  res.status(200).json({
    insights: [
      { type: 'warning', title: 'Velocity Drop', message: 'Task completion rate is down 15% this week.' },
      { type: 'success', title: 'Milestone Prediction', message: 'Project Alpha is on track to finish 3 days early.' },
      { type: 'info', title: 'Resource Allocation', message: 'Team member John has 5 overdue tasks.' }
    ]
  });
};
