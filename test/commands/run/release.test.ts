import {expect, test} from '@oclif/test'

describe('run:release', () => {
  const testFactory = () => {
    return test
    .stdout()
    .do(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      process.stdout.isTTY = false
    })
  }

  testFactory()
  .command(['run:release', '--app=lit-lake-49867', 'echo 1 2 3'])
  .it('runs a command', async ctx => {
    expect(ctx.stdout).to.include('1 2 3\n')
  })

  testFactory()
  .command(['run:release', '--release=1', '--app=lit-lake-49867', 'echo 1 2 3'])
  .it('runs a command', async ctx => {
    expect(ctx.stdout).to.include('1 2 3\n')
  })

  testFactory()
  .command(['run:release', '--app=lit-lake-49867', 'ruby -e "puts ARGV[0]" "{"foo": "bar"} " '])
  .it('runs a command with spaces', ctx => {
    expect(ctx.stdout).to.contain('{foo: bar} \n')
  })

  testFactory()
  .command(['run:release', '--app=lit-lake-49867', 'ruby -e "puts ARGV[0]" "{"foo":"bar"}"'])
  .it('runs a command with quotes', ctx => {
    expect(ctx.stdout).to.contain('{foo:bar}\n')
  })

  testFactory()
  .command(['run:release', '--app=lit-lake-49867', '-e FOO=bar', 'env'])
  .it('runs a command with env vars', ctx => {
    expect(ctx.stdout).to.include('FOO=bar')
  })

  testFactory()
  .command(['run:release', '--app=lit-lake-49867', '--exit-code', 'invalid-command'])
  .exit(127)
  .it('gets 127 status for invalid command', ctx => {
    expect(ctx.stdout).to.include('invalid-command: command not found')
  })
})
