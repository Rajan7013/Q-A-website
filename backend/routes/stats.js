import express from 'express';

const router = express.Router();

// In-memory storage for user stats
const userStats = new Map();
const userActivity = new Map();
const userAchievements = new Map();

// Get user stats
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const stats = userStats.get(userId) || {
      documentsAnalyzed: 0,
      questionsAnswered: 0,
      studyHours: 0,
      examsPrepared: 0,
      conversations: 0,
      achievements: 0
    };
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Update stats (called after each action)
router.post('/:userId/increment', (req, res) => {
  try {
    const { userId } = req.params;
    const { field, value = 1 } = req.body;
    
    const currentStats = userStats.get(userId) || {
      documentsAnalyzed: 0,
      questionsAnswered: 0,
      studyHours: 0,
      examsPrepared: 0,
      conversations: 0,
      achievements: 0
    };
    
    currentStats[field] = (currentStats[field] || 0) + value;
    userStats.set(userId, currentStats);
    
    res.json({ stats: currentStats });
  } catch (error) {
    console.error('Increment stats error:', error);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

// Get user activity (for charts)
router.get('/:userId/activity', (req, res) => {
  try {
    const { userId } = req.params;
    const activity = userActivity.get(userId) || generateDefaultActivity();
    res.json({ activity });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({ error: 'Failed to get activity' });
  }
});

// Log activity
router.post('/:userId/activity', (req, res) => {
  try {
    const { userId } = req.params;
    const { day, value } = req.body;
    
    let activity = userActivity.get(userId) || generateDefaultActivity();
    const dayIndex = activity.findIndex(a => a.day === day);
    
    if (dayIndex >= 0) {
      activity[dayIndex].value += value;
    }
    
    userActivity.set(userId, activity);
    res.json({ activity });
  } catch (error) {
    console.error('Log activity error:', error);
    res.status(500).json({ error: 'Failed to log activity' });
  }
});

// Get achievements
router.get('/:userId/achievements', (req, res) => {
  try {
    const { userId } = req.params;
    const achievements = userAchievements.get(userId) || getDefaultAchievements();
    res.json({ achievements });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Failed to get achievements' });
  }
});

// Update achievement
router.post('/:userId/achievements/:achievementId', (req, res) => {
  try {
    const { userId, achievementId } = req.params;
    let achievements = userAchievements.get(userId) || getDefaultAchievements();
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      achievement.earned = true;
      achievement.earnedDate = new Date().toISOString();
    }
    
    userAchievements.set(userId, achievements);
    
    // Increment achievements count in stats
    const currentStats = userStats.get(userId) || {
      documentsAnalyzed: 0,
      questionsAnswered: 0,
      studyHours: 0,
      examsPrepared: 0,
      conversations: 0,
      achievements: 0
    };
    currentStats.achievements = achievements.filter(a => a.earned).length;
    userStats.set(userId, currentStats);
    
    res.json({ achievements });
  } catch (error) {
    console.error('Update achievement error:', error);
    res.status(500).json({ error: 'Failed to update achievement' });
  }
});

function generateDefaultActivity() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({ day, value: 0 }));
}

function getDefaultAchievements() {
  return [
    { id: 'first-upload', title: 'First Upload', desc: 'Uploaded your first document', icon: '🎉', earned: false },
    { id: '100-questions', title: '100 Questions', desc: 'Asked 100 questions', icon: '🎯', earned: false },
    { id: 'week-streak', title: 'Week Streak', desc: '7 days of continuous learning', icon: '🔥', earned: false },
    { id: 'master-learner', title: 'Master Learner', desc: '1000 hours of study', icon: '🏆', earned: false },
    { id: 'document-expert', title: 'Document Expert', desc: 'Analyzed 50+ documents', icon: '📚', earned: false },
    { id: 'ai-collaborator', title: 'AI Collaborator', desc: 'Perfect sync with AI', icon: '🤖', earned: false }
  ];
}

export default router;