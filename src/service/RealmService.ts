import Realm from "realm"
import { log } from "../config"
import { REALM_CONFIGRATION } from "../schemas/schema"

let realmInstance

export const openRealm = async () => {
  log('open realm first line')
  if(realmInstance) {
    return realmInstance
  }
  log('open realm after if')
    return new Promise((resolve, reject) => {
      try {
        Realm.open(REALM_CONFIGRATION).then((r) => {
          log('open realm inside  if', r)
          realmInstance = r
          resolve(realmInstance)
        })
      }catch(err) {
        log('error in realm is ', err)
      }
    })

}

export const writeRealmData = async (schemaName, dataToWrite) => {
  log('writeRealmDatawriteRealmData is called', Realm.defaultPath)
  const realm = await openRealm()
  // log('writeRealmData', realm)
  try {
    const schemaData = await realm.write(() => {
      realm.create(schemaName, dataToWrite, "modified")
    })
    log('schemaDatavschemaData', schemaData,
    )

  } catch(err) {
    log('schemaDatavschemaData', err)

  }

}


const realmToPlainObject = (realmObj) => {
  return JSON.parse(JSON.stringify(realmObj));
}

export const getDataFromRealm = async (model) => {
  try {
    const realm = await openRealm()
    log('realmDatarealmDatarealmData', realm)
    const realmData = realm.objects(model)
    log('realmDatarealmDatarealmData realmDatarealmDatarealmDatarealmDatarealmData', realmData)

    return realmToPlainObject(realmData)
  } catch (err) {
    console.log('getDataFromRealm error', model, err)
    log('getDataFromRealm error', model, err )
    return undefined
  }
}


export const getDataByPrimaryKey = async (model, primaryKevVal) => {
  try {
    const realm = await openRealm()
    log('realmDatarealmDatarealmData', realm)
    const realmData = realm.objectForPrimaryKey(model, primaryKevVal)
    log('realmDatarealmDatarealmData realmDatarealmDatarealmDatarealmDatarealmData', realmData)

    return realmToPlainObject(realmData)
  } catch (err) {
    log('getDataFromRealm error', model, err )
    return undefined
  }
}

export const deleteDataFromRealm = async(model, filteredCondition) => {
  try {
    const realm = await openRealm()
    log('deleteDataFromRealm', filteredCondition)
    const objToDelete = realm.objects(model).filtered(filteredCondition)
    log('realmDatarealmDatarealmData', objToDelete)
    realm.write(() => {
      realm.delete(objToDelete)
    })
    return true
  } catch (err) {
    console.log('getDataFromRealm error', model, err )
    return undefined
  }
}