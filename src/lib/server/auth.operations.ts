import { graphql } from 'techtonic-client-gql';

export const LOGIN_MUTATION = graphql(`
	mutation Login($name: String!, $password: String!) {
		auth {
			login(name: $name, password: $password) {
				accessToken {
					tokenValue
					expiresAt
				}
				refreshToken {
					tokenValue
					expiresAt
				}
				user {
					id
					name
					status
					roles {
						id
						name
					}
				}
			}
		}
	}
`);

export const ME_QUERY = graphql(`
	query Me {
		auth {
			me {
				id
				name
				status
				creationTime
				lastLoginTime
				roles {
					id
					name
				}
			}
		}
	}
`);

export const REFRESH_MUTATION = graphql(`
	mutation Refresh($refreshToken: String!) {
		auth {
			refresh(refreshToken: $refreshToken) {
				accessToken {
					tokenValue
					expiresAt
				}
				refreshToken {
					tokenValue
					expiresAt
				}
			}
		}
	}
`);

export const LOGOUT_MUTATION = graphql(`
	mutation Logout {
		auth {
			logout {
				message
			}
		}
	}
`);
