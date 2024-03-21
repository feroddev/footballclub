import { IBoard } from '../Interfaces/board/IBoard';
import { IMatches } from '../Interfaces/matches/IMatches';
import { ITeams } from '../Interfaces/teams/ITeams';

const totalPoints = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const homeMatches = matches.filter((match) => match.homeTeamId === id);
    return homeMatches.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  const awayMatches = matches.filter((match) => match.awayTeamId === id);
  return awayMatches.reduce((acc, match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) return acc + 3;
    if (match.awayTeamGoals === match.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
};

const totalGames = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const totalMatches = matches.filter((match) => match.homeTeamId === id).length;
    const totalVictories = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals > match.awayTeamGoals).length;
    const totalDraws = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals === match.awayTeamGoals).length;
    const totalLosses = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals < match.awayTeamGoals).length;
    return { totalMatches, totalVictories, totalDraws, totalLosses };
  }

  const totalMatches = matches.filter((match) => match.awayTeamId === id).length;
  const totalVictories = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals > match.homeTeamGoals).length;
  const totalDraws = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals === match.homeTeamGoals).length;
  const totalLosses = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals < match.homeTeamGoals).length;
  return { totalMatches, totalVictories, totalDraws, totalLosses };
};

const goals = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const goalsFavor = matches.filter((match) => match.homeTeamId === id)
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matches.filter((match) => match.homeTeamId === id)
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return { goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn };
  }
  const goalsFavor = matches.filter((match) => match.awayTeamId === id)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const goalsOwn = matches.filter((match) => match.awayTeamId === id)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return { goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn };
};

const efficiency = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away' | 'total') => {
  if (homeOrAway === 'total') {
    const totalHome = totalGames(id, matches, 'home');
    const totalAway = totalGames(id, matches, 'away');
    const totalMatches = totalHome.totalMatches + totalAway.totalMatches;
    const points = totalPoints(id, matches, 'home') + totalPoints(id, matches, 'away');
    return `${((points / (totalMatches * 3)) * 100).toFixed(2)}`;
  }
  const { totalMatches } = totalGames(id, matches, homeOrAway);
  const points = totalPoints(id, matches, homeOrAway);
  return `${((points / (totalMatches * 3)) * 100).toFixed(2)}`;
};

export const boardTransformHome = (teams: ITeams, matches: IMatches[]): IBoard => ({
  name: teams.teamName,
  totalPoints: totalPoints(teams.id, matches, 'home'),
  totalGames: totalGames(teams.id, matches, 'home').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'home').totalVictories,
  totalDraws: totalGames(teams.id, matches, 'home').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'home').totalLosses,
  goalsFavor: goals(teams.id, matches, 'home').goalsFavor,
  goalsOwn: goals(teams.id, matches, 'home').goalsOwn,
  goalsBalance: goals(teams.id, matches, 'home').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'home'),
});

export const boardTransformAway = (teams: ITeams, matches: IMatches[]): IBoard => ({
  name: teams.teamName,
  totalPoints: totalPoints(teams.id, matches, 'away'),
  totalGames: totalGames(teams.id, matches, 'away').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'away').totalVictories,
  totalDraws: totalGames(teams.id, matches, 'away').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'away').totalLosses,
  goalsFavor: goals(teams.id, matches, 'away').goalsFavor,
  goalsOwn: goals(teams.id, matches, 'away').goalsOwn,
  goalsBalance: goals(teams.id, matches, 'away').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'away'),
});

export const boardTransform = (teams: ITeams, matches: IMatches[]): IBoard => ({
  name: teams.teamName,
  totalPoints: totalPoints(teams.id, matches, 'home')
    + totalPoints(teams.id, matches, 'away'),
  totalGames: totalGames(teams.id, matches, 'home').totalMatches
    + totalGames(teams.id, matches, 'away').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'home').totalVictories
    + totalGames(teams.id, matches, 'away').totalVictories,
  totalDraws: totalGames(teams.id, matches, 'home').totalDraws
    + totalGames(teams.id, matches, 'away').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'home').totalLosses
    + totalGames(teams.id, matches, 'away').totalLosses,
  goalsFavor: goals(teams.id, matches, 'home').goalsFavor
    + goals(teams.id, matches, 'away').goalsFavor,
  goalsOwn: goals(teams.id, matches, 'home').goalsOwn
    + goals(teams.id, matches, 'away').goalsOwn,
  goalsBalance: goals(teams.id, matches, 'home').goalsBalance
    + goals(teams.id, matches, 'away').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'total'),
});

export const sortBoard = (board: IBoard[]): IBoard[] => board.sort((a, b) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
  return a.name.localeCompare(b.name);
});
