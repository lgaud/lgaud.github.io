---
layout: post
title:  "How to use a root domain using Azure Static Web Apps and Domain.com"
description: When I tried to set up a root domain, I broke my email. This post covers how I fixed it using Pointers & Subdomains.
image: /images/blog/2022-03-09_pointer_and_subdomains.png
tag: infrastructure
---

I am currently using Azure Static Web Apps to host my site at [www.plankido.com](https://www.plankido.com), with a domain registered on Domain.com. And I also have Google Workspace email on that domain.

I set up the CNAME record for the `www` subdomain following the [Azure docs](https://docs.microsoft.com/en-us/azure/static-web-apps/custom-domain-external), and then I went to set up the apex domain. 
The [Azure Static Web Apps documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/apex-domain-external) mentions an ALIAS record, which isn't an option in Domain.com, with an alternative of a CNAME record if the host supports domain name flattening (which I'm still not clear of Domain.com does). My first attempt at fixing this was to set up CNAME for the root domain, and this worked - but then I realized emails weren't getting through. So I turned that off and just lived with the non-www version not working for a bit.
This meant that most use cases would work, as browsers tend to add the `www`, but, if you forced it to use the root domain with a link to [https://plankido.com](https://plankido.com) it was returning 403 Forbidden.

I took another crack at it today and after noticing a bit about "Forward to www subdomain" in the Microsoft docs I found [Domain Pointers](https://www.domain.com/help/article/domain-management-how-to-update-domain-pointers) in Domain.com, and I now have a URL Stealth pointer to my Azure Static Web apps URL (https:// and all) and everything is lovely. The "Pointers & Subdomains" section is right above the "DNS & Nameservers" section I'd been dealing with in the domain.com sidebar.

![Screenshot of Domain.com Pointers & Subdomains page](/images/blog/2022-03-09_pointer_and_subdomains.png)

Domain name configuration is one of those things where every service does it a little differently and it's hard to find documents covering your exact configuration! I hope this helps!