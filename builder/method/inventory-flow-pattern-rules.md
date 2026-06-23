# Inventory Flow Pattern Rules

Author new PCR inventory content as process inventory, not as a flat inventory list.

Each material PCR should break the product category into common modelling processes first. Within each process, organize the inventory in this order:

1. direction: `inputs` or `outputs`
2. flow type: `product`, `waste`, or `elementary`
3. individual flow rows

Each flow row should record:

- modelling role
- flow type
- Tiangong flow UUID and version when a database flow exists
- flow property UUID and version
- unit group UUID and version
- preferred reference unit
- expected or typical range, when useful
- range basis, such as `per 1,000 kg reference product`
- source ids that support the flow identity and the range
- range quality, such as `observed-row`, `literature`, `draft-prior`, or `pending-review`

Keep flow identity evidence separate from range evidence. A database flow search can justify the UUID choice, but it does not by itself justify an inventory amount range unless a process row or external source supports that amount.
