# use-auth-slim

React hook for authentication, the slim version

## The original version

The predecessor, [use-auth](https://github.com/metamn/use-auth) was built on [use-data](https://github.com/metamn/use-data) and it's verbose. This hook is built on [use-api](https://github.com/metamn/use-auth) giving a more readable, easier to use code.

## This project

Gives you the authentication hook with the API hook strategy (see them in `/src/hooks/useAuth/strategies`) and the test components associated to the strategy. (in `src/components`)

## Usage

1. Copy the `src/hooks` folder into your app
2. Set up [useAPI](https://github.com/metamn/use-api), [useData](https://github.com/metamn/use-data/blob/master/src/hooks/useData/useData.md#usage) and [useAuth](https://github.com/metamn/use-auth/blob/master/src/hooks/useAuth/useAuth.md#usage) according to your needs.

## Documentation

See the [strategy docs](./src/hooks/useAuth/strategies/useAuthFinster/useAuthFinster.md) for details.
