/** Adopted from github */
function k_combinations(set, k) {
  let i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }
  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }
  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

const Combination = (set) => {
  let k, i, combs, k_combs;
  combs = [];

  // Calculate all non-empty k-combinations
  for (k = 1; k <= set.length; k++) {
    k_combs = k_combinations(set, k);
    for (i = 0; i < k_combs.length; i++) {
      if (k_combs[i].length > 1) combs.push(k_combs[i]);
    }
  }
  return combs;
};
/** */

const GetTransformedArray = ({ arr }) => {
  //get transformed array from
  //and parsed it to column based
  let possibility = 0;
  let transformedRelation = [];

  for (let i = 0; i < arr[0].length; ++i) {
    const tempArr = arr.map((el) => el[i]);
    //check whether there is a duplicated value or not
    const tempSet = new Set(tempArr).size;
    if (tempArr.length === tempSet) {
      possibility++;
    } else {
      transformedRelation.push(tempArr);
    }
  }
  return {
    possibility: possibility,
    arr: transformedRelation,
  };
};

module.exports = {
  GetTransformedArray: GetTransformedArray,
  Combination: Combination,
};
