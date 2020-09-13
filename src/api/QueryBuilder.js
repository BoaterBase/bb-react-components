import { query, getDocs, limit, where } from '@firebase/firestore';

export default class QueryBuilder {
  constructor(collection) {
    this.query = query(collection);
  }
  where(path, option, value) {
    this.query = query(this.query, where(path, option, value));
    return this;
  }
  limit(size) {
    this.query = query(this.query, limit(size));
    return this;
  }
  async get(options) {
    const snapshot = await getDocs(this.query);
    return {
      size: snapshot.size,
      empty: snapshot.empty,
      docs: await Promise.all(snapshot.docs.map(async (doc) => await doc.data(options))),
    };
  }
}
