const TP_BENCHMARK = 45;

const processScore = (currentData, previousData) => {
  let delta = 0;
  let change = 0;
  let score = 0;
  let previousScore = 0;

  if (currentData.length === 0) {
    return { score, delta, change, data: { current: [], previous: [] } };
  }

  score = currentData[currentData.length - 1].Score;
  if (currentData.length >= 2) {
    let prev = currentData[currentData.length - 2].Score;
    if (previousData?.length === 12) {
      prev = previousData[previousData.length - 1].Score;
    }
    delta = score - prev;
    change = delta / prev;
    previousScore = prev;
  }

  const current = currentData.map(({ Score, Date: d }) => {
    return {
      value: Score,
      date: new Date(d),
    };
  });
  let previous = [];
  if (previousData) {
    previous = previousData.map(({ Score, Date: d }) => {
      return {
        value: Score,
        date: new Date(d),
      };
    });
  }

  return {
    delta,
    change,
    score,
    previousScore,
    benchmark: TP_BENCHMARK,
    benchmarkChange: (score - TP_BENCHMARK) / TP_BENCHMARK,
    data: {
      current,
      previous,
    },
  };
};

const processTouchpoints = (current, previous) => {
  const touchpoints = current.Touchpoints.map(({ Id, Name, DataPoints }) => {
    let prev;
    if (previous) {
      prev = previous.Touchpoints.find((tp) => tp.Id === Id);
    }

    return {
      id: Id,
      label: Name,
      ...processScore(DataPoints, prev?.DataPoints),
    };
  });
  return touchpoints;
};

const processAgreement = (currentData, previousData) => {
  let delta = 0;
  let change = 0;
  let agreement = currentData;
  let previousAgreement = 0;

  if (!isNaN(previousData)) {
    previousAgreement = previousData;
    delta = agreement - previousAgreement;
    change = delta / Math.abs(previousAgreement);
    if (previousAgreement === 0) {
      change = 1;
    }
  }

  return {
    delta,
    change,
    agreement,
    previousAgreement,
  };
};

const processTouchpointDetail = (current, previous) => {
  const bd = (c, p) => {
    let change = 0;
    if (!isNaN(p)) {
      const delta = c - p;
      change = delta / Math.abs(p);
      if (p === 0) {
        change = 1;
      }
    }

    return {
      value: c,
      change,
    };
  };

  const breakdown = (
    { Agree, Disagree, Neutral, StronglyAgree, StronglyDisagree },
    previousBreakdown
  ) => {
    return {
      stronglyDisagree: bd(
        StronglyDisagree,
        previousBreakdown?.StronglyDisagree
      ),
      disagree: bd(Disagree, previousBreakdown?.Disagree),
      neutral: bd(Neutral, previousBreakdown?.Neutral),
      agree: bd(Agree, previousBreakdown?.Agree),
      stronglyAgree: bd(StronglyAgree, previousBreakdown?.StronglyAgree),
    };
  };
  const questions = current.Questions.map(
    ({ Id, Label, ShortLabel, NetAgreement, Breakdown }, i) => {
      let prev;
      if (previous) {
        prev = previous.Questions.find((q) => q.Id === Id);
      }

      return {
        id: Id,
        label: Label,
        shortLabel: ShortLabel,
        netAgreement: processAgreement(NetAgreement, prev?.NetAgreement),
        breakdown: breakdown(Breakdown, prev?.Breakdown),
      };
    }
  );
  return questions;
};

export { processTouchpoints, processTouchpointDetail };
