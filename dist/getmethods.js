"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
const axios_1 = require("axios");
const errors_1 = require("./errors");
class DBService {
    constructor(apiURL = "https://api.brawltools.com", completion) {
        this.API_URL = apiURL;
        this.completionClosure = completion;
    }
    uri(path) {
        return this.API_URL + path;
    }
    runQuery(endpoint, method = "get", body = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const doRequest = () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const res = yield (0, axios_1.default)({
                        method,
                        url: this.uri(endpoint),
                        data: body,
                        timeout: 5000,
                    });
                    (_a = this.completionClosure) === null || _a === void 0 ? void 0 : _a.call(this);
                    return res;
                }
                catch (e) {
                    // 404's don't count as normal failures.
                    if (e.response && e.response.status === 404) {
                        return e.response;
                    }
                    throw e;
                }
            });
            return doRequest();
        });
    }
    /**
     * Fetch a player's most recent legend.
     */
    getPlayerLegend(params) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/${params.playerId}/legend`, "get", {});
                if (res.status === 404) {
                    return null;
                }
                return (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.legend) === null || _b === void 0 ? void 0 : _b.name;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetchng player legend information.", "DB", true, e);
            }
        });
    }
    /**
     * Fetch a player's PR information.
     */
    getPlayerPR(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/pr`, "post", {
                    entrantSmashIds: [params.entrantSmashId],
                    ganeMode: params.gameMode,
                });
                if (res.status === 404) {
                    return null;
                }
                // const key = gameMode === 1 ? "pr1v1" : "pr2v2";
                return res.data;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetching player PR.", "DB", true, e);
            }
        });
    }
    // TODO: Migrate getMatchup to the new API.
    getMatchup(params) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/matchup`, "post", { isOfficial: true, entrant1SmashIds: params.entrant1SmashIds, entrant2SmashIds: params.entrant2SmashIds, gameMode: params.gameMode });
                if (res.status === 404) {
                    return [0, 0];
                }
                const matchup = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.matchups) === null || _b === void 0 ? void 0 : _b[0];
                return matchup === null || matchup === void 0 ? void 0 : matchup.matches;
            }
            catch (e) {
                if (((_c = e.response) === null || _c === void 0 ? void 0 : _c.status) === 400) {
                    return [0, 0];
                }
                throw new errors_1.BackendError(`Error fetching player matchup ${params.entrant1SmashIds
                    .concat(params.entrant2SmashIds)
                    .join(", ")}`, "DB", true, e);
            }
        });
    }
    getPlayer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/${params.playerId}`, "get", {});
                if (res.status === 404) {
                    return null;
                }
                return res.data.player;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetching player information.", "DB", true, e);
            }
        });
    }
    getPlayerBrawlhallaId(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/bhId/${params.brawlhallaId}`, "get", {});
                if (res.status === 404) {
                    return null;
                }
                return res.data.player;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetching player information.", "DB", true, e);
            }
        });
    }
    getPlayerEvents(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/placement`, "post", { entrantSmashIds: [params.entrantSmashId], isOfficial: true, year: params.year, gameMode: params.gameMode });
                if (res.status === 404) {
                    return [];
                }
                return res.data.playerPlacements;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetching player tournament history", "DB", true, e);
            }
        });
    }
    getPlayerEventMatches(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.runQuery(`/player/match`, "post", { eventSlug: params.slug, entrantSmashIds: [params.entrantSmashId] });
                if (res.status === 404) {
                    return [];
                }
                return res.data.playerMatches;
            }
            catch (e) {
                throw new errors_1.BackendError("Error when fetching player tournament matches", "DB", true, e);
            }
        });
    }
}
exports.DBService = DBService;
