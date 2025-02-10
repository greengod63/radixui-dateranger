ARG VARIANT="buster"

#-----------------------------------------------------------------------------------------------------------------------------------------------------
FROM node:16-slim AS tools

RUN apt update && \
    apt install -y --no-install-recommends apt-transport-https build-essential ca-certificates curl tar bash unzip git python3

# Get AWS CLI
# https://docs.aws.amazon.com/cli/latest/userguide/install-linux.html#install-linux-awscli
# Note that we also remove some things that we don't need, like autocomplete and examples
RUN curl -sSL https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip -o awscliv2.zip && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf  \
        awscliv2.zip \
        ./aws \
        /usr/local/aws-cli/v2/current/dist/aws_completer \
        /usr/local/aws-cli/v2/current/dist/awscli/data/ac.index \
        /usr/local/aws-cli/v2/current/dist/awscli/examples && \
    find /usr/local/aws-cli/v2/current/dist/awscli/data -name completions-1*.json -delete && \
    find /usr/local/aws-cli/v2/current/dist/awscli/botocore/data -name examples-1.json -delete

RUN npm install -g aws-cdk




# #-----------------------------------------------------------------------------------------------------------------------------------------------------
# # See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.217.2/containers/debian/.devcontainer/base.Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT} AS devcontainer

# # Allow mounting a volume for extensions (see devcontainer.json)
# # This is necessary because we are using a non-root user in the container
# # https://code.visualstudio.com/remote/advancedcontainers/avoid-extension-reinstalls
ARG USERNAME=vscode
RUN mkdir -p /home/$USERNAME/.vscode-server/extensions && \
    chown -R $USERNAME /home/$USERNAME/.vscode-server

# # Mount a volume to persist bash history between container restarts
# # https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
# # Note that this configures both bash and zsh to share the same history file
RUN mkdir -p /commandhistory && \
    touch /commandhistory/.bash_history && \
    chown -R $USERNAME /commandhistory && \
    echo "shopt -s histappend && export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history && export HISTCONTROL=ignoredups" >> "/home/$USERNAME/.bashrc" && \
    echo "export HISTFILE=/commandhistory/.bash_history && unsetopt extended_history share_history && setopt hist_find_no_dups hist_ignore_dups inc_append_history" >> "/home/$USERNAME/.zshrc"

# # Install any required packages here
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update



# # Copy tools into the image

COPY --from=tools /usr/local/bin/ /usr/local/bin/
COPY --from=tools /usr/local/lib/ /usr/local/lib/
# COPY --from=tools /usr/local/share/ /usr/local/share/
COPY --from=tools /usr/local/aws-cli/ /usr/local/aws-cli/

RUN apt install -y python3-pip
RUN pip3 install git-remote-codecommit
