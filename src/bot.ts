import { Bot, Context, h, Schema } from 'koishi'
import { EOL } from 'os'
import ReplAdapter from './adapter'

class ReplBot extends Bot {
  hidden = true

  constructor(ctx: Context, config: ReplBot.Config) {
    super(ctx, config)
    this.platform = 'repl'
    this.selfId = 'koishi'
    ctx.plugin(ReplAdapter, this)
  }

  private write(content: h.Fragment) {
    process.stdout.write('\x08\x08< ')
    process.stdout.write(h('', content).toString(true))
    process.stdout.write(EOL)
    process.stdout.write('> ')
  }

  async sendPrivateMessage(userId: string, content: h.Fragment) {
    this.write(content)
    return []
  }

  async sendMessage(channelId: string, content: h.Fragment, guildId?: string) {
    this.write(content)
    return []
  }
}

namespace ReplBot {
  export interface Config {}
  export const Config: Schema<Config> = Schema.object({})
}

export default ReplBot
