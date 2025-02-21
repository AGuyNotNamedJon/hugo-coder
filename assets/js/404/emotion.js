// 404 Emotion Handler
const error404 = {
  currentEmotion: null,
  defaultEmotions: [
    'generic',
    'confused',
    'tableflip',
    'unflip',
    'annoyed',
    'frustrated',
    'content',
    'apologetic',
    'helpful',
    'professional',
    'jedi'
  ],

  // Generate a new random emotion
  generateEmotion() {
    try {
      // Check for Jedi chance if enabled
      if (this.isJediEnabled && (Math.random() * 100) < this.jediChance) {
        this.currentEmotion = 'jedi';
      } else {
        // Get random emotion from configured list
        const emotions = this.emotions || this.defaultEmotions;
        this.currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      }

      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('emotionGenerated', {
        detail: { emotion: this.currentEmotion }
      }));

      return this.currentEmotion;
    } catch (error) {
      console.error('Error generating emotion:', error);
      return 'generic'; // Fallback to generic on error
    }
  },

  // Initialize on page load
  init(config = {}) {
    // Set configuration
    this.emotions = config.emotions || null;
    this.jediChance = Number(config.jediChance || 1);
    this.isJediEnabled = config.emotions ? config.emotions.includes('jedi') : true;

    // Generate emotion immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.generateEmotion());
    } else {
      this.generateEmotion();
    }
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = error404;
} else {
  window.error404 = error404;
}
