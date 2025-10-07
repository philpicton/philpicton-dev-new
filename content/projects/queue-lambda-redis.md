---
title: "High availability queueing system"
description: "AWS Lambda functions to handle high concurrency web traffic"
thumbnail: "/images/projects/queue-thumb.jpg"
heroImage: "/images/projects/queue-hero.jpg"
tech: ["AWS Lambda", "Node.js", "Redis", "Docker", "CI/CD"]
date: "2022-06-24"
---

## Overview

After experiencing unscheduled downtime due to a large scale ticket launch, we built a queue system to limit the numbers of users allowed through to the platform. The initial work was done by an outside contractor but was unfinished. I took over the remaining development and debugging of the feature, then undertook extensive refactoring, performance optimisation and load testing. I then added further features, improvements, tests and integrations with our backoffice and front end. I have maintained the codebase ever since, and it has worked reliably to this day.

## Key features

- Cookie based session handling
- Multi-tenant, allowing different subdomains to run separate queues
- Client themed queue webpage with position in queue served from S3
- Session management and timeout once on Ticketing page
- Granular control over which parts of the platform are queue-able
- Backoffice superuser statistics dashboard for monitoring and adjusting settings such as quotas and TTLs on a per subdomain/queue basis
- Separate Lambda for collecting metrics for Prometheus->Graphana to monitor performance
- Extremely performant, handling many thousands of concurrent requests without issue
- Detailed multi level logging controlled via env settings for debugging
- Integration test suite
- Code Quality enforcement in CI/CD pipelines
- Minimal dependencies
- Fully documented

## Architecture

Incoming requests (via load balancer) are handled by the main lambda.

If the user must join the queue, the lambda serves them a queue webpage from S3. When they are at the front of the queue, they are redirected to the main site, and must keep their session alive, as further requests on the main site still go via the Lambda.

The lambdas logic is based around a Redis sorted set.

The sessions are given a UUID and a score, which is the timestamp of when the session was created.

By using a sorted set, we can run fast queries to determine if a session is allowed to proceed, or should remain in the queue.

Each user receives the session UUID, in their cookie, and must keep their session alive by making requests as it expires on a variable TTL.

We provide an automatic keepalive script on our frontend so that as long as they remain active on the ticketing site, their session will not expire.

Since Redis does not support expiring elements on a sorted set, we use another sorted set, the Pool, where the score is the TTL of each session.

We then have a purge function which deletes the expired sessions from both keys, sessions and pool.

Additional Lambda functions handle interactions from our backoffice, changing settings, monitoring.

## Stack

- AWS Lambda
- Docker
- Node.js
- Sharded Redis Cluster
- Jest
- S3
- ESLint
- Bitbucket pipelines for CI/CD
- Vue 3 dashboard (Pinia, Vitest)

## Business impact

Further downtime for the platform would have been very damaging to the business, with the likelihood of losing major clients.

Once deployed, in time for two simultaneous major ticket launches, the queue performed flawlessly. Allowing the platform to function properly, handling over half a million pounds of transactions in around half an hour. It has gone on to protect the platform ever since and we have used it to mitigate cyber attacks.
