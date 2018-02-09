import Type from 'union-type';

export const UserList = Type({ RecentTop: [], AllTimeTop: [] });
export const toListKey = UserList.case({
  RecentTop: () => 'recent',
  AllTimeTop: () => 'alltime'
});

export const ListState = Type({ NotLoaded: [], Loaded: [Array] });
