import OpenAI from 'openai';
import MockAIService from './mockAIService';

const useMock = !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'mock' || process.env.OPENAI_API_KEY.includes('placeholder');

const openai = useMock ? null : new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const mockService = useMock ? new MockAIService() : null;

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

export class AIService {
  private systemPrompts = {
    INITIAL_ASSESSMENT: `You are a compassionate mental health assistant for Hope Clinic. You're conducting an initial mental health assessment. 
    Ask empathetic, open-ended questions to understand the patient's:
    - Current emotional state and mood
    - Recent life stressors or triggers
    - Sleep patterns and physical health
    - Support system and relationships
    - Any thoughts of self-harm or harm to others
    
    Be warm, non-judgmental, and professional. Ask one question at a time. Listen actively.
    If you detect crisis situations (suicidal ideation, severe depression, abuse), acknowledge urgently and recommend immediate professional help.`,
    
    ONGOING_MONITORING: `You are a supportive mental health companion for Hope Clinic patients in ongoing therapy.
    Check in on their progress, mood changes, and coping strategies.
    Provide encouragement and remind them of techniques discussed in therapy.
    Note any concerning patterns or regression.`,
    
    CRISIS_INTERVENTION: `You are a crisis support assistant for Hope Clinic. The patient is in acute distress.
    Provide immediate emotional support while gathering critical information.
    Assess immediate safety and suicide risk.
    Provide crisis resources and strongly recommend emergency professional intervention.`,
    
    FOLLOW_UP_CHECK: `You are following up with a Hope Clinic patient after their recent therapy session.
    Ask about their progress with action items, any difficulties implementing strategies,
    and overall mood since the last session. Be supportive and encouraging.`
  };

  async getInitialMessage(sessionType: string): Promise<string> {
    if (mockService) {
      return mockService.getInitialMessage(sessionType);
    }
    
    const greetings = {
      INITIAL_ASSESSMENT: "Hello! I'm here to help you get started with Hope Clinic. I'd like to understand how you're feeling and what brings you here today. Can you tell me a bit about what's been on your mind lately?",
      ONGOING_MONITORING: "Hi there! I hope you're doing well. Let's check in on how you've been feeling since we last talked. How has your mood been over the past few days?",
      CRISIS_INTERVENTION: "I'm here to support you right now. I can see you're going through a difficult time. Can you tell me what's happening and how you're feeling at this moment?",
      FOLLOW_UP_CHECK: "Hello! It's good to connect with you again. I wanted to follow up on how things have been going since your last session. Have you had a chance to try any of the strategies we discussed?"
    };

    return greetings[sessionType as keyof typeof greetings] || greetings.INITIAL_ASSESSMENT;
  }

  async getResponse(params: {
    sessionId: string;
    sessionType: string;
    messageHistory: MessageHistory[];
    currentMessage: string;
  }): Promise<AIResponseData> {
    // Use mock service if OpenAI not configured
    if (mockService) {
      return mockService.getResponse(params);
    }
    
    try {
      const { sessionType, messageHistory, currentMessage } = params;

      // Build conversation history
      const messages: any[] = [
        {
          role: 'system',
          content: this.systemPrompts[sessionType as keyof typeof this.systemPrompts]
        }
      ];

      // Add message history (limit to last 20 messages for context)
      const recentMessages = messageHistory.slice(-20);
      recentMessages.forEach(msg => {
        messages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        });
      });

      // Add current message
      messages.push({
        role: 'user',
        content: currentMessage
      });

      // Get AI response
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 500
      });

      const aiMessage = completion.choices[0].message.content || '';

      // Analyze sentiment and emotions
      const analysis = await this.analyzeMessage(currentMessage, aiMessage);

      return {
        message: aiMessage,
        ...analysis
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  private async analyzeMessage(userMessage: string, aiResponse: string): Promise<Omit<AIResponseData, 'message'>> {
    try {
      // Use AI to analyze sentiment, mood, and urgency
      const analysisPrompt = `Analyze this mental health conversation exchange and provide a JSON response:

User message: "${userMessage}"
AI response: "${aiResponse}"

Provide analysis in this exact JSON format:
{
  "sentiment": "positive|negative|neutral|concerned",
  "emotions": ["emotion1", "emotion2"],
  "keywords": ["keyword1", "keyword2"],
  "mood": "stable|anxious|depressed|elevated|mixed",
  "urgencyLevel": "NORMAL|MODERATE|HIGH|CRITICAL",
  "redFlags": ["flag1", "flag2"]
}

Red flags to detect: suicidal ideation, self-harm mentions, severe depression, abuse, psychosis symptoms.
Urgency levels: NORMAL (stable), MODERATE (mild distress), HIGH (significant distress), CRITICAL (immediate danger).`;

      const analysisCompletion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a clinical psychology analyzer. Respond only with valid JSON.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 300
      });

      const analysisText = analysisCompletion.choices[0].message.content || '{}';
      const analysis = JSON.parse(analysisText);

      return {
        sentiment: analysis.sentiment || 'neutral',
        emotions: analysis.emotions || [],
        keywords: analysis.keywords || [],
        mood: analysis.mood || 'stable',
        urgencyLevel: analysis.urgencyLevel || 'NORMAL',
        redFlags: analysis.redFlags || []
      };
    } catch (error) {
      console.error('Analysis Error:', error);
      // Return default values if analysis fails
      return {
        sentiment: 'neutral',
        emotions: [],
        keywords: [],
        mood: 'stable',
        urgencyLevel: 'NORMAL',
        redFlags: []
      };
    }
  }

  async generateReport(session: any): Promise<any> {
    // Use mock service if OpenAI not configured
    if (mockService) {
      return mockService.generateReport(session);
    }
    
    try {
      // Compile conversation
      const conversation = session.messages
        .map((msg: any) => `${msg.role === 'user' ? 'Patient' : 'AI'}: ${msg.content}`)
        .join('\n\n');

      const reportPrompt = `Generate a comprehensive clinical mental health assessment report based on this AI chat session:

Session Type: ${session.sessionType}
Duration: ${session.startedAt} to ${session.endedAt || 'ongoing'}

CONVERSATION:
${conversation}

Provide a detailed report in this JSON format:
{
  "findings": "Main findings and observations from the conversation",
  "moodAnalysis": "Detailed mood and emotional state analysis",
  "conditionIndicators": {
    "depression": "none|mild|moderate|severe",
    "anxiety": "none|mild|moderate|severe",
    "stress": "none|mild|moderate|severe"
  },
  "riskAssessment": "Assessment of risk factors and safety concerns",
  "recommendations": "Clinical recommendations for treatment and next steps",
  "followUpActions": "Specific follow-up actions for the patient and clinical team"
}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a licensed clinical psychologist generating a professional assessment report. Be thorough, evidence-based, and compassionate.'
          },
          {
            role: 'user',
            content: reportPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      });

      const reportText = completion.choices[0].message.content || '{}';
      return JSON.parse(reportText);
    } catch (error) {
      console.error('Report Generation Error:', error);
      throw new Error('Failed to generate report');
    }
  }
}
