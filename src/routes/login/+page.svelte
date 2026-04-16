<script lang="ts">
	import * as v from 'valibot';
	import { redirect } from '@sveltejs/kit';
	import { login, getMe } from '$lib/remotes/auth.remote';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import ModeToggle from '$lib/components/mode-toggle.svelte';

	const user = await getMe();
	if (user) redirect(302, '/');

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Required')),
		_password: v.pipe(v.string(), v.nonEmpty('Required'))
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-background p-4">
	<div class="absolute top-4 right-4">
		<ModeToggle />
	</div>

	<div class="w-full max-w-sm space-y-6">
		<div class="space-y-1 text-center">
			<div
				class="bg-primary text-primary-foreground mx-auto mb-4 flex size-10 items-center justify-center rounded-lg text-lg font-bold"
			>
				T
			</div>
			<h1 class="text-2xl font-semibold tracking-tight">Sign in</h1>
			<p class="text-sm text-muted-foreground">Techtonic CMS</p>
		</div>

		{#each login.fields.allIssues() as issue}
			<div class="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
				{issue.message}
			</div>
		{/each}

		<form {...login.preflight(preflight)} class="space-y-4">
			<div class="space-y-1.5">
				<Label for="name">Username</Label>
				{#each login.fields.name.issues() as issue}
					<p class="text-xs text-destructive">{issue.message}</p>
				{/each}
				<Input
					id="name"
					{...login.fields.name.as('text')}
					autocomplete="username"
					placeholder="Enter your username"
				/>
			</div>

			<div class="space-y-1.5">
				<Label for="password">Password</Label>
				{#each login.fields._password.issues() as issue}
					<p class="text-xs text-destructive">{issue.message}</p>
				{/each}
				<Input
					id="password"
					{...login.fields._password.as('password')}
					autocomplete="current-password"
					placeholder="••••••••"
				/>
			</div>

			<Button type="submit" class="w-full">Sign in</Button>
		</form>
	</div>
</div>
