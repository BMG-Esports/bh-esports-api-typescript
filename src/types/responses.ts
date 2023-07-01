export type GetPlayerResponse = {
    player: {
      smashId: number;
      brawlhallaId: number;
      name: string;
    };
  };
  

  export type PRInformationResponse = {
    top8: number;
    top32: number;
    gold: number;
    silver: number;
    bronze: number;
    powerRanking: number;
    region: string;
  };
  
  export type PlayerPRResponse = {
    earnings: number;
    pr: PRInformationResponse;
  };
  
  export type PlayerLegendResponse = {
    legend: {
      name: string;
      count: number;
    };
  };
  
  export type MatchupResponse = {
    matchups: {
      matches: [number, number];
      games: [number, number];
    }[];
  };
  
  export type PlayerPlacementsResponse = {
    playerPlacements: {
      placement: number;
      tournament: {
        slug: string;
      };
    }[];
  };
  
  export type PlayerMatchesResponse = {
    playerMatches: {
      matchId: number;
      scores: [number, number];
    }[];
  };

  export type TeammateResponse = {
    playerTeammates: {
      player: {
        smashId: number;
        brawlhallaId: number;
        name: string;
      };
      games: number;
      lastTeamedDate: number;
    }[];
  }

  export type PlayerListResponse = {
    players: {
      smashId: number;
      brawlhallaId: number;
      name: string;
    }[];
  }

  export type PlayerLegendsResponse = {
    legends: {
      name: string;
      count: number;
    }[];
  }

  export type SearchPlayersResponse = {
    searchPlayers: {
        player: {
          smashId: number;
          brawlhallaId: number;
          name: string;
          twitch: string;
          twitter: string;
        }
      pr1v1: number;
      pr2v2: number;
      region: string;
      top32: number;
      top8: number;
      gold: number;
      silver: number;
      bronze: number;
      earnings: number;
    }[];
  }

  export type MatchupPlacementsResponse = {
    matchupPlacements: {
      placements: number[];
      tournament: {
        slug: string;
        tournamentName: string;
        eventName: string;
        year: number;
        isTwos: boolean;
        startTime: number;
      }
        player: {
          smashId: number;
          brawlhallaId: number;
          name: string;
          twitch: string;
          twitter: string;
        }
    }[];
  }

  export type MatchupMatchesResponse = {
    matchupMatches: {
      matchId: number;
      scores: number[];
      legends: string[][];
      maps: string[];
    }[];
  }

  export type ListEventsResponse = {
    tournaments: {
      slug: string;
      tournamentName: string;
      eventName: string;
      year: number;
      isTwos: boolean;
      startTime: number;
    }[];
  }

  export type GetStatsResponse = {
    stats: number[];
  }

  export type GetPRResponse = {
    prPlayers: {
      playerId: number;
      playerName: string;
      twitter: string;
      twitch: string;
      top8: number;
      top32: number;
      gold: number;
      silver: number;
      bronze: number;
      powerRanking: number;
      points: number;
      earnings: number;
    }[];
  }