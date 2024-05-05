const randRange = (lower, upper) => {
  if (upper == undefined) {
    upper = lower;
    lower = 0;
  };
  return lower + Math.floor(Math.random()*(upper-lower));
};

const randInt = (lower, upper)  =>
  lower + Math.floor(Math.random()*(upper-lower+1))
;

const randDiceRoll = () => randInt(1, 6);

const randCoinFlip = () => randInt(1, 2);

const randChoice = (seq) =>
  seq[randRange(0,seq.length)]
;

const randChoiceExcept = (seq, seqEx) => {
  const isString = (s) => {return typeof s === 'string' || s instanceof String;};
  if (isString(seq))           {seq   = seq.split("");};
  if (isString(seqEx))         {seqEx = seqEx.split("");};
  const filteredSeq = seq.filter((x) => !seqEx.includes(x));
  if (filteredSeq.length == 0) {return null;}
  else                         {return randChoice(filteredSeq);}
}

const randMultiChoice = (seq, n) => {
  let result = [];
  for (i=0; i<n; i++) {
    item = randChoiceExcept(seq, result);
    result.push(item);
  };
  return result;
}

const randMultiChoiceExcept = (seq, seqEx, n) => {
  let result = [];
  for (i=0; i<n; i++) {
    item = randChoiceExcept(seq, result.concat(seqEx));
    result.push(item);
  };
  return result;
}

const swap = (seq, i, j) => {
  let buffer = seq[i];
  seq[i] = seq[j];
  seq[j] = buffer;
};

const shuffle = (seq) => {
  let cloneSeq = [...seq];
  let shuffledSeq = [];
  while (0 < cloneSeq.length) {
    let i = randRange(0, cloneSeq.length);
    shuffledSeq.push(cloneSeq[i]);
    cloneSeq.splice(i, 1);
  };
  return shuffledSeq;
};

const shuffleInplace = (seq) => {
  for (let i=0; i<seq.length-1; i++) {
    let j = randRange(i+1, seq.length);
    swap(seq, i, j);
  };
};

const getVariations = (...sequences) => {
  const prependItem = (xss, ys) => {
    let result = [];
    for (let xs of xss) {
      for (y of ys) {
        result.push([y].concat(xs));
      };
    };
    return result;
  };
  let result = [[]];
  while (0 < sequences.length) {
    lastOne = sequences.pop();
    result = prependItem(result, lastOne)
  };
  return result;
};