import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const DOMAIN = "krisgholson.com"

// Please note that the imported resources are marked as protected. To destroy them
// you will need to remove the `protect` option and run `pulumi update` *before*
// the destroy will take effect.
const krisgholson = new aws.route53.Zone("krisgholson", {
    comment: "Managed by Pulumi",
    name: DOMAIN,
}, {
    protect: true,
})


// Create a DNS record in the hosted zone
const aRecord = new aws.route53.Record("aRecord", {
    zoneId: krisgholson.zoneId,
    name: DOMAIN,
    type: "A",
    ttl: 300,
    records: ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"],
})

const wwwRecord = new aws.route53.Record("wwwRecord", {
    zoneId: krisgholson.zoneId,
    name: `www.${DOMAIN}`,
    type: "CNAME",
    ttl: 300,
    records: ["krisgholson.github.io"],
})

// Export the name servers
export const nameServers = krisgholson.nameServers
