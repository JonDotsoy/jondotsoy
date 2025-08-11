.PHONY: all
all: fmt

.PHONY: dependency-bun
dependency-bun:
	@if ! [ -x "$$(command -v bun)" ]; then \
		echo "Error: bun is not installed." >&2; \
		exit 1; \
	fi

.PHONY: fmt
fmt: dependency-bun
	bun x prettier -w .
