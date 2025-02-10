import { create as createHttp } from "../utils/net";

const wrap = (fn, redirect) => {
  return async (...args) => {
    try {
      const res = await fn(...args);
      return res;
    } catch (e) {
      if (e.status === 401) {
        redirect("/login");
      } else {
        console.log("Error caught");
        console.log(e);
      }
    }
  };
};

const formatDate = (date: Date) => {
  // return date.toISOString().split("T")[0];

  //date.toISOString() on its own converts to UTC, so we need some timezone voodoo to keep the right date
  var isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  return isoDateTime.split("T")[0];
};

const api = {
  configure({ server, redirect }) {
    const { httpPost, httpGet, httpPut, httpDelete } = createHttp(server);
    this.httpGet = wrap(httpGet, redirect);
    this.httpPost = wrap(httpPost, redirect);
    this.httpPut = wrap(httpPut, redirect);
    this.httpDelete = wrap(httpDelete, redirect);
  },

  // AUTH

  exchangeToken({ code }) {
    return this.httpPost("/auth/exchange-token", { code });
  },

  validateToken() {
    return this.httpPut("/auth/validate-token");
  },

  logout() {
    return this.httpDelete("/auth/logout");
  },

  // ACCOUNT

  account() {
    return this.httpGet("/account");
  },

  // REPORTS

  nps({
    accountId,
    surveyId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/nps/${accountId}/${surveyId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  npsQuestions({
    accountId,
    surveyId,
  }: {
    accountId: string;
    surveyId: string;
  }) {
    return this.httpGet(`/reports/nps/questions/${accountId}/${surveyId}`);
  },

  statistics({
    accountId,
    surveyId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/stats/${accountId}/${surveyId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  touchpoints({
    accountId,
    surveyId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/touchpoints/${accountId}/${surveyId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  touchpointQuestions({
    accountId,
    surveyId,
  }: {
    accountId: string;
    surveyId: string;
  }) {
    return this.httpGet(
      `/reports/touchpoints/questions/${accountId}/${surveyId}`
    );
  },

  touchpointDetail({
    accountId,
    surveyId,
    touchpointId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    touchpointId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(`/reports/touchpoints/deepdive/${accountId}/${surveyId}?from=${formatDate(from)}&to=${formatDate(to)}&touchpointId=${touchpointId}`);
    
  },

  themes({
    accountId,
    surveyId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/themes/${accountId}/${surveyId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  suggestions({
    accountId,
    surveyId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/suggestions/${accountId}/${surveyId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  async comments({
    accountId,
    surveyId,
    from,
    to,
    filter,
  }: {
    accountId: string;
    surveyId: string;
    from: Date;
    to: Date;
    filter?: CommentFilter;
  }) {
    const res = await this.suggestions({ accountId, surveyId, from, to });
    res.Comments = res.Suggestions;
    delete res.Suggestions;
    res.Comments = res.Comments.map((c) => {
      c.Comment = c.Suggestion;
      delete c.Suggestion;
      return c;
    });
    return res;
  },

  async improvements({
    accountId,
    surveyId,
    touchpointId,
    from,
    to,
  }: {
    accountId: string;
    surveyId: string;
    touchpointId: string,
    from: Date;
    to: Date;
  }) {
    return this.httpGet(
      `/reports/touchpoints/improvements/${accountId}/${surveyId}/${touchpointId}?from=${formatDate(
        from
      )}&to=${formatDate(to)}`
    );
  },

  // testUnauthorized() {
  //   return this.httpGet("/auth/test-unauthorized");
  // },
};

type CommentFilter = {
  touchpointId?: string;
};

export default api;
