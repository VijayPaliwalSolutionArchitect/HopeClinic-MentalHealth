// Mock AI Service - Works without OpenAI API key
// Provides realistic mental health responses for testing

interface MessageHistory {
  role: string;
  content: string;
}

interface AIResponseData {
  message: string;
  sentiment: string;
  emotions: string[];
  keywords: string[];
  mood: string;
  urgencyLevel: string;
  redFlags: string[];
}

export class MockAIService {
  private sessionPrompts = {
    INITIAL_ASSESSMENT: "Hello! I'm here to help you get started with Hope Clinic. I'd like to understand how you're feeling and what brings you here today. Can you tell me a bit about what's been on your mind lately?",
    ONGOING_MONITORING: "Hi there! I hope you're doing well. Let's check in on how you've been feeling since we last talked. How has your mood been over the past few days?",
    CRISIS_INTERVENTION: "I'm here to support you right now. I can see you're going through a difficult time. Can you tell me what's happening and how you're feeling at this moment?",
    FOLLOW_UP_CHECK: "Hello! It's good to connect with you again. I wanted to follow up on how things have been going since your last session. Have you had a chance to try any of the strategies we discussed?"
  };

  private mockResponses = [
    "Thank you for sharing that with me. It takes courage to talk about these feelings. Can you tell me more about when you first started noticing these symptoms?",
    "I hear you, and what you're experiencing is valid. Many people face similar challenges. Have you noticed any specific triggers or patterns?",
    "That sounds really difficult. You're not alone in feeling this way. Let's work together to find strategies that can help. What has helped you cope in the past?",
    "I appreciate you opening up about this. It's an important step toward healing. How are these feelings affecting your daily life and relationships?",
    "Your feelings are completely understandable given what you've described. Have you been able to talk to anyone else about this, like family or friends?",
    "It's clear you're going through a lot right now. Remember, seeking help is a sign of strength. What would you like to achieve through therapy?",
    "Thank you for trusting me with this information. Together, we can develop coping strategies. What's been the hardest part for you lately?"
  ];

  async getInitialMessage(sessionType: string): Promise<string> {
    return this.sessionPrompts[sessionType as keyof typeof this.sessionPrompts] || this.sessionPrompts.INITIAL_ASSESSMENT;
  }

  async getResponse(params: {
    sessionId: string;
    sessionType: string;
    messageHistory: MessageHistory[];
    currentMessage: string;
  }): Promise<AIResponseData> {
    
    const message = this.currentMessage.toLowerCase();
    
    // Detect crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself'];
    const isCrisis = crisisKeywords.some(keyword => message.includes(keyword));
    
    // Detect high urgency keywords
    const urgentKeywords = ['can\'t take it', 'unbearable', 'hopeless', 'give up', 'can\'t go on'];
    const isUrgent = urgentKeywords.some(keyword => message.includes(keyword));

    // Generate appropriate response based on content
    let responseMessage = '';
    
    if (isCrisis) {
      responseMessage = "I'm really concerned about what you've shared. Your safety is the top priority right now. I strongly encourage you to:\n\n1. Call the National Suicide Prevention Lifeline: 1-800-273-8255 (available 24/7)\n2. Go to your nearest emergency room\n3. Call 911 if you're in immediate danger\n\nPlease know that you matter, and there are people who want to help. Would you like me to connect you with a crisis counselor right away?";
    } else if (isUrgent) {
      responseMessage = "I can hear how overwhelming things feel right now. These feelings, while intense, are temporary. You're taking an important step by reaching out. Let's focus on getting you connected with a therapist who can provide immediate support. In the meantime, please consider contacting our crisis line at 1-800-273-8255 if these feelings intensify. What can we do right now to help you feel a bit safer?";
    } else {
      // Use a random supportive response
      responseMessage = this.mockResponses[Math.floor(Math.random() * this.mockResponses.length)];
    }

    // Analyze sentiment
    const positiveWords = ['better', 'good', 'happy', 'hopeful', 'improving', 'grateful'];
    const negativeWords = ['sad', 'depressed', 'anxious', 'worried', 'scared', 'hopeless', 'alone'];
    
    const hasPositive = positiveWords.some(word => message.includes(word));
    const hasNegative = negativeWords.some(word => message.includes(word));
    
    let sentiment = 'neutral';
    if (hasPositive && !hasNegative) sentiment = 'positive';
    if (hasNegative && !hasPositive) sentiment = 'negative';
    if (hasPositive && hasNegative) sentiment = 'mixed';

    // Extract emotions
    const emotions: string[] = [];
    if (message.includes('anxious') || message.includes('worried')) emotions.push('anxiety');
    if (message.includes('sad') || message.includes('depressed')) emotions.push('sadness');
    if (message.includes('angry') || message.includes('frustrated')) emotions.push('anger');
    if (message.includes('scared') || message.includes('afraid')) emotions.push('fear');
    if (message.includes('hopeful') || message.includes('better')) emotions.push('hope');
    
    if (emotions.length === 0) emotions.push('neutral');

    // Extract keywords
    const keywords: string[] = [];
    if (message.includes('sleep')) keywords.push('sleep_issues');
    if (message.includes('work') || message.includes('job')) keywords.push('work_stress');
    if (message.includes('relationship') || message.includes('family')) keywords.push('relationships');
    if (message.includes('panic') || message.includes('attack')) keywords.push('panic_attacks');
    
    // Determine mood and urgency
    const mood = sentiment === 'positive' ? 'improving' : sentiment === 'negative' ? 'distressed' : 'stable';
    const urgencyLevel = isCrisis ? 'CRITICAL' : isUrgent ? 'HIGH' : 'NORMAL';
    
    // Red flags
    const redFlags: string[] = [];
    if (isCrisis) redFlags.push('suicidal_ideation');
    if (message.includes('harm')) redFlags.push('self_harm');
    if (message.includes('abuse')) redFlags.push('abuse');

    return {
      message: responseMessage,
      sentiment,
      emotions,
      keywords,
      mood,
      urgencyLevel,
      redFlags
    };
  }

  async generateReport(session: any): Promise<any> {
    return {
      findings: "Based on the conversation, the patient shows signs of stress and anxiety. They are actively seeking help and demonstrating willingness to engage in treatment.",
      moodAnalysis: "Mood fluctuates between anxious and hopeful. Patient shows awareness of their condition.",
      conditionIndicators: {
        anxiety: 'moderate',
        depression: 'mild',
        stress: 'high'
      },
      riskAssessment: "Low immediate risk. Patient has support system and is seeking professional help.",
      recommendations: "Continue with weekly therapy sessions. Consider cognitive behavioral therapy (CBT) for anxiety management. Recommend stress reduction techniques and regular follow-ups.",
      followUpActions: "Schedule in-person consultation. Provide coping strategies worksheet. Set up weekly check-ins."
    };
  }
}

export default MockAIService;
