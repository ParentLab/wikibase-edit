require('should')
const { __ } = require('config')
const setClaim = __.require('lib/claim/set')
const {
  guid,
  sandboxStringProp: property,
  properties
} = __.require('test/unit/utils')

describe('claim set', () => {
  it('should set the action to wbsetclaim', done => {
    const { action } = setClaim({
      guid,
      property,
      value: 'foo'
    }, properties)
    action.should.equal('wbsetclaim')
    done()
  })

  it('should return formatted claim data for a string', done => {
    const { data } = setClaim({
      guid,
      property,
      value: 'foo'
    }, properties)
    JSON.parse(data.claim).should.deepEqual({
      id: guid,
      type: 'statement',
      mainsnak: {
        snaktype: 'value',
        property,
        datavalue: {
          value: 'foo',
          type: 'string'
        }
      }
    })
    done()
  })
})
