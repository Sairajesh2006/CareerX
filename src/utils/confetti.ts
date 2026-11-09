import confetti from 'canvas-confetti';

export function triggerConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'],
  });
}

export function triggerAchievementCelebration() {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#6366f1', '#ec4899', '#3b82f6', '#10b981'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
