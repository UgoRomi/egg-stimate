import { useCallback, useMemo } from 'react';
import { useStore } from './zustand';

export function useVoteCalculation() {
  const users = useStore((state) => state.users);
  const setLottie = useStore((state) => state.setLottie);

  const votes = useMemo(() => {
    // show for each result how many times it was voted, ordered by most voted.
    // And keep track of who voted what
    const votes = new Map<number, string[]>();
    for (const user of users.values()) {
      if (user.current_vote === null) continue;
      if (votes.has(user.current_vote)) {
        votes.set(user.current_vote, [
          ...(votes.get(user.current_vote) || []),
          user.name,
        ]);
      } else {
        votes.set(user.current_vote, [user.name]);
      }
    }
    // sort the votes by most voted
    return Array.from(votes.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );
  }, [users]);

  const showLottie = useCallback(() => {
    if (votes.length === 1) {
      if (votes[0][0] === 4) {
        // delfini
        setLottie(
          'https://assets7.lottiefiles.com/packages/lf20_ep5xgsuo.json'
        );
      } else {
        // default, confetti
        setLottie(
          'https://assets1.lottiefiles.com/packages/lf20_obhph3sh.json'
        );
      }
    }
  }, [setLottie, votes]);

  return { showLottie };
}
