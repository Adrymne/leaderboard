import Type from 'union-type';
import { T } from 'ramda';

export const Maybe = Type({ Just: [T], Nothing: [] });

export const UserList = Type({ RecentTop: [], AllTimeTop: [] });
export const toListKey = UserList.case({
  RecentTop: () => 'recent',
  AllTimeTop: () => 'alltime'
});

export const SortOrder = Type({ Ascending: [], Descending: [] });
export const SortField = Type({ Username: [], Recent: [], AllTime: [] });

export const ListState = Type({ NotLoaded: [], Loaded: [Array] });
