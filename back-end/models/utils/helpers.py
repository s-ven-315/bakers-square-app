import peewee as pw
from typing import List, Type
from .base_model import BaseModel


class Helper:
    @staticmethod
    def set_id_list(main: BaseModel,
                    idList: List[str],
                    Class: Type[BaseModel],
                    Relation: Type[BaseModel],
                    attr1: str,
                    RelationAttr1: pw.ForeignKeyField,
                    attr2: str,
                    RelationAttr2: pw.ForeignKeyField):
        try:
            toAdd = []
            for idItem in idList:
                item = Class.get_by_id(idItem)
                existingRelation = Relation.get_or_none(RelationAttr1 == main, RelationAttr2 == item)
                if not existingRelation:
                    toAdd.append({attr1: main, attr2: item})

            # Adding & Delete
            if len(toAdd) > 0:
                Relation.insert_many(toAdd).execute()
            toDel = Relation.delete().where(RelationAttr1 == main, RelationAttr2.not_in(idList))
            toDel.execute()
            return True
        except:
            return False


    @staticmethod
    def set_id_list_with_qty(main: BaseModel,
                             arr: List,
                             Class: Type[BaseModel],
                             Relation: Type[BaseModel],
                             attr1: str,
                             RelationAttr1: pw.ForeignKeyField,
                             attr2: str,
                             RelationAttr2: pw.ForeignKeyField):
        try:
            toAdd, toUpdate = [], []
            for a in arr:
                item = Class.get_by_id(a['id'])
                existingRelation = Relation.get_or_none(RelationAttr1 == main, RelationAttr2 == item)
                if not existingRelation:
                    toAdd.append({attr1: main, attr2: item, 'qty': a['qty'], 'unit': a['unit']})
                elif a['qty'] != existingRelation.qty or a['unit'] != existingRelation.unit:
                    existingRelation.qty = str(a['qty'])
                    existingRelation.unit = str(a['unit'])
                    toUpdate.append(existingRelation)

            # Adding
            if len(toAdd) > 0:
                Relation.insert_many(toAdd).execute()

            # Updating
            if len(toUpdate) > 0:
                Relation.bulk_update(toUpdate, fields=[Relation.qty, Relation.unit])

            # Deleting
            idList = [a['id'] for a in arr]
            toDel = Relation.delete().where(RelationAttr1 == main, RelationAttr2.not_in(idList))
            toDel.execute()
            return True
        except Exception as e:
            raise e
