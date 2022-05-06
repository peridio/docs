"use strict";(self.webpackChunkparasola=self.webpackChunkparasola||[]).push([[42],{2427:function(e){e.exports=JSON.parse('{"type":"object","content":{"openapi":"3.1.0","info":{"title":"Peridio API","version":"0.1.0"},"servers":[{"url":"https://api.peridio.com/v0"}],"tags":[{"name":"Authentication","x-traitTag":true,"description":"Requests are authenticated by the [API Key](/reference/api-keys) provided via the `peridio-api-key` header.\\n\\n```shell\\ncurl https://api.peridio.com/v1/identity \\\\\\n  -H peridio-api-key: ZjE4M2U5NWYwZTVkNDQyOGEyMmQ5ODRmOWM1MjMzOGVQT2owQzJNSG0rdGhqZWJQTGVwMFA2N2VCSjJsYlU2VW5oR09GUUxPSGEyM0tZOXRnby9vL0oyeXBRRTI\\n```\\n"},{"name":"Errors","x-traitTag":true,"description":"Errors returned use the following structure:\\n\\n```json\\n{\\"code\\": \\"some_error_code\\", \\"context\\": {}}\\n```\\n\\nThe value of the `context` key is dependent on the error code.\\n\\n## Bad Endpoint\\n\\nThe requested endpoint does not exist.\\n\\nReturns a 400 HTTP status code and uses the `bad_endpoint` error code.\\n\\n```json\\n{\\"code\\": \\"bad_endpoint\\", \\"context\\": {}}\\n```\\n\\n## Unauthenticated\\n\\nA valid Peridio API key was not provided.\\n\\nReturns a 401 HTTP status code and uses the `unauthenticated` error code.\\n\\n```json\\n{\\"code\\": \\"unauthenticated\\", \\"context\\": {\\"api_key\\": null}}\\n```\\n\\n## Unauthorized\\n\\nThe authentication identity does not have access to a necessary authorization scope.\\n\\nReturns a 403 HTTP status code and uses the `unauthorized` error code.\\n\\n```json\\n{\\"code\\": \\"unauthorized\\", \\"context\\": {\\"resource_id\\": \\"some_resource_id\\", \\"scope_name\\": \\"some_scope_name\\"}}\\n```\\n\\n## Not Found\\n\\nA subject of the request could not be resolved.\\n\\nReturns a 404 HTTP status code and uses the `not_found` error code.\\n\\n```json\\n{\\"code\\": \\"not_found\\", \\"context\\": {}}\\n```\\n\\n## Content Negotiation\\n\\nThe request\'s \\"accept\\" header is unacceptable.\\n\\nReturns a 406 HTTP status code and uses the `content_negotiation` error code.\\n\\n```json\\n{\\"code\\": \\"content_negotiation\\", \\"context\\": {}}\\n```\\n\\n## Conflict\\n\\nThe request was denied to prevent it from acting on potentially stale presumptions.\\n\\nReturns a 409 HTTP status code and uses the `conflict` error code.\\n\\n```json\\n{\\"code\\": \\"conflict\\", \\"context\\": {}}\\n```\\n\\n## Parameter\\n\\nThe parameter\'s requirements were not met.\\n\\nReturns a 422 HTTP status code and uses the `parameter` error code.\\n\\n```json\\n{\\"code\\": \\"parameter\\", \\"context\\": {\\"parameter\\": \\"name_of_parameter\\", \\"reason\\": \\"required\\"}}\\n```\\n\\n### Reasons\\n\\n- `bad_length` - The value supplied is either too short or too long.\\n- `invalid` - The value supplied does not match the data type required.\\n- `must_be_unique` - The value supplied is already in use elsewhere and must be unique.\\n- `required` - No value was supplied but the parameter is required.\\n\\n## Too Many Requests\\n\\nToo many requests hit the API too quickly. We recommend an exponential backoff of your requests.\\n\\nReturns a 429 HTTP status code and uses the `too_many_requests` error code.\\n\\n```json\\n{\\"code\\": \\"too_many_requests\\", \\"context\\": {}}\\n```\\n\\n## Internal Server Error\\n\\nAn unaccounted for error was encountered.\\n\\nReturns a 500 HTTP status code and uses the `internal_server_error` error code.\\n\\n```json\\n{\\"code\\": \\"internal_server_error\\", \\"context\\": {}}\\n```\\n"}],"x-tagGroups":[{"name":"Overview","tags":["Authentication","Errors"]},{"name":"Endpoints","tags":["Distributions","Elements","Identity","Node Types","Nodes"]}],"paths":{"/distributions":{"get":{"summary":"list distributions","tags":["Distributions"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-distributions"}}}}}},"post":{"summary":"create distribution","tags":["Distributions"],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"element_version_id":{"$ref":"#/components/schemas/element-version-id"},"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across distributions within an account.\\n"},"next_distribution_id":{"$ref":"#/components/schemas/distribution-id","description":"Only a single distribution within a node group at any given time is allowed to have an unset `next_distribution_id` and it is referred to as the head distribution.\\n"},"node_group_id":{"$ref":"#/components/schemas/node-group-id"}},"required":["element_version_id","name","node_group_id"]}}}},"responses":{"200":{"description":"Created.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/distribution"}}}}}}},"/distributions/{distribution_id}":{"get":{"summary":"get distribution","tags":["Distributions"],"parameters":[{"name":"distribution_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/distribution"}}}}}},"put":{"summary":"update distribution","tags":["Distributions"],"parameters":[{"name":"distribution_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across distributions within an account.\\n"}}}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/distribution"}}}}}}},"/elements":{"get":{"summary":"list elements","tags":["Elements"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-elements"}}}}}},"post":{"summary":"create element","tags":["Elements"],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across elements within an account.\\n"}},"required":["name"]}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element"}}}}}}},"/elements/{element_id}":{"get":{"summary":"get element","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element"}}}}}},"put":{"summary":"update element","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across elements within an account.\\n"}}}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element"}}}}}}},"/elements/{element_id}/versions":{"get":{"summary":"list element versions","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-element-versions"}}}}}},"post":{"summary":"create element version","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"number":{"$ref":"#/components/schemas/element-version-number","description":"Uniqueness enforced across an element\'s versions within an account.\\n"}},"required":["number"]}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element-version"}}}}}}},"/elements/{element_id}/versions/{element_version_id}":{"get":{"summary":"get element version","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}},{"name":"element_version_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element-version"}}}}}}},"/elements/{element_id}/versions/{element_version_id}/binaries":{"get":{"summary":"list element version binaries","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}},{"name":"element_version_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-element-version-binaries"}}}}}},"post":{"summary":"create element version binary","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}},{"name":"element_version_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/octet-stream":{"schema":{"type":"string","format":"binary","description":"The submitted binary must be less than or equal to 1 GB."}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element-version-binary"}}}}}}},"/elements/{element_id}/versions/{element_version_id}/binaries/{element_version_binary_id}":{"get":{"summary":"get element version binary","tags":["Elements"],"parameters":[{"name":"element_id","in":"path","required":true,"schema":{"type":"string"}},{"name":"element_version_id","in":"path","required":true,"schema":{"type":"string"}},{"name":"element_version_binary_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/element-version-binary"}}}}}}},"/identity":{"get":{"summary":"get identity","description":"Gets information identifying the API Key used to authenticate the request, the Account it is a part of, and the Member it belongs to if applicable.\\n","tags":["Identity"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/identity"}}}}}}},"/nodes":{"get":{"summary":"list nodes","tags":["Nodes"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-nodes"}}}}}},"post":{"summary":"create node","tags":["Nodes"],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across nodes within an account.\\n"},"node_group_id":{"$ref":"#/components/schemas/node-group-id"},"node_type_id":{"$ref":"#/components/schemas/node-type-id"}},"required":["name","node_group_id","node_type_id"]}}}},"responses":{"200":{"description":"Created.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node"}}}}}}},"/nodes/{node_id}":{"get":{"summary":"get node","tags":["Nodes"],"parameters":[{"name":"node_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node"}}}}}},"put":{"summary":"update node","tags":["Nodes"],"parameters":[{"name":"node_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across nodes within an account.\\n"}}}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node"}}}}}}},"/node-groups":{"get":{"summary":"list groups","tags":["Nodes"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-node-groups"}}}}}},"post":{"summary":"create node group","tags":["Nodes"],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across node groups within an account.\\n"},"node_type_id":{"$ref":"#/components/schemas/node-type-id"}},"required":["name","node_type_id"]}}}},"responses":{"200":{"description":"Created.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-group"}}}}}}},"/node-groups/{node_group_id}":{"get":{"summary":"get group","tags":["Nodes"],"parameters":[{"name":"node_group_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-group"}}}}}},"put":{"summary":"update group","tags":["Nodes"],"parameters":[{"name":"node_group_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across node groups within an account.\\n"}}}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-group"}}}}}}},"/node-types":{"get":{"summary":"list node types","tags":["Node Types"],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/array-of-node-types"}}}}}},"post":{"summary":"create node type","description":"Name is unique","tags":["Node Types"],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name"}},"required":["name"]}}}},"responses":{"200":{"description":"Created.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-type"}}}}}}},"/node-types/{node_type_id}":{"get":{"summary":"get node type","tags":["Node Types"],"parameters":[{"name":"node_type_id","in":"path","required":true,"schema":{"type":"string"}}],"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-type"}}}}}},"put":{"summary":"update node type","description":"Name is unique","tags":["Node Types"],"parameters":[{"name":"node_type_id","in":"path","required":true,"schema":{"type":"string"}}],"requestBody":{"required":true,"content":{"application/json":{"schema":{"properties":{"name":{"$ref":"#/components/schemas/name"}}}}}},"responses":{"200":{"description":"","content":{"application/json":{"schema":{"$ref":"#/components/schemas/node-type"}}}}}}}},"components":{"schemas":{"account-id":{"type":"string","format":"uuid"},"api-key-id":{"type":"string","format":"uuid"},"array-of-distributions":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/distribution"}},"array-of-element-ids":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/element-id"}},"array-of-element-version-binaries":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/element-version-binary"}},"array-of-element-versions":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/element-version"}},"array-of-elements":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/element"}},"array-of-node-groups":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/node-group"}},"array-of-node-types":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/node-type"}},"array-of-nodes":{"type":"array","minItems":0,"maxItems":100,"items":{"$ref":"#/components/schemas/node"}},"distribution":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"element_version_id":{"$ref":"#/components/schemas/element-version-id"},"id":{"$ref":"#/components/schemas/distribution-id"},"name":{"$ref":"#/components/schemas/name"},"next_distribution_id":{"anyOf":[{"type":"null"},{"$ref":"#/components/schemas/distribution-id"}]},"node_group_id":{"$ref":"#/components/schemas/node-group-id"},"updated_at":{"type":"string","format":"date-time"}}}]},"distribution-id":{"type":"string","format":"uuid"},"element":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"id":{"$ref":"#/components/schemas/element-id"},"name":{"$ref":"#/components/schemas/name"},"updated_at":{"type":"string","format":"date-time"}}}]},"element-id":{"type":"string","format":"uuid"},"element-version":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"element_id":{"$ref":"#/components/schemas/element-id"},"id":{"$ref":"#/components/schemas/element-version-id"},"number":{"$ref":"#/components/schemas/element-version-number"},"updated_at":{"type":"string","format":"date-time"}}}]},"element-version-binary":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"hash":{"type":"string"},"id":{"$ref":"#/components/schemas/element-version-binary-id"},"size":{"type":"integer","format":"bytes"},"updated_at":{"type":"string","format":"date-time"},"element_version_id":{"$ref":"#/components/schemas/element-version-id"}}}]},"element-version-binary-id":{"type":"string","format":"uuid"},"element-version-id":{"type":"string","format":"uuid"},"identity":{"type":"object","properties":{"api_key_id":{"$ref":"#/components/schemas/api-key-id"},"account_id":{"$ref":"#/components/schemas/account-id"},"member_id":{"anyOf":[{"type":"null"},{"$ref":"#/components/schemas/member-id"}]}}},"element-version-number":{"type":"string"},"member-id":{"type":"string","format":"uuid"},"name":{"type":"string","minLength":1,"maxLength":128},"node":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"id":{"$ref":"#/components/schemas/node-id"},"name":{"$ref":"#/components/schemas/name"},"node_group_id":{"$ref":"#/components/schemas/node-group-id"},"node_type_id":{"$ref":"#/components/schemas/node-type-id"},"updated_at":{"type":"string","format":"date-time"}}}]},"node-group":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"id":{"$ref":"#/components/schemas/node-group-id"},"name":{"$ref":"#/components/schemas/name","description":"Uniqueness enforced across node groups within an account.\\n"},"node_type_id":{"$ref":"#/components/schemas/node-type-id"},"updated_at":{"type":"string","format":"date-time"}}}]},"node-type":{"allOf":[{"type":"object","properties":{"created_at":{"type":"string","format":"date-time"},"id":{"$ref":"#/components/schemas/node-type-id"},"name":{"$ref":"#/components/schemas/name"},"updated_at":{"type":"string","format":"date-time"}}}]},"node-group-id":{"type":"string","format":"uuid"},"node-id":{"type":"string","format":"uuid"},"node-type-id":{"type":"string","format":"uuid"}}}}}')}}]);