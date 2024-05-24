export function formatVoteCount(votes) {
  let formattedVotes;
  if (votes >= 1000000) {
    formattedVotes = (votes / 1000000).toFixed(1) + "M";
  } else if (votes >= 1000) {
    formattedVotes = (votes / 1000).toFixed(1) + "K";
  } else {
    formattedVotes = votes.toString();
  }
  return `(${formattedVotes})`;
}
export function formatRuntime(runtime) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  let formattedRuntime = "";

  if (hours > 0) {
    formattedRuntime += `${hours}h `;
  }

  if (minutes > 0) {
    formattedRuntime += `${minutes}m`;
  }

  return formattedRuntime.trim();
}

export function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function formatBudget(budget) {
  const formattedBudget = budget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedBudget;
}
