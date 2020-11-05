import peewee as pw
from typing import List, Type
from models.base_model import BaseModel


class Helper:
    @staticmethod
    def assert_id_list(idList: List[str], Class: Type[BaseModel], className: str):
        if type(idList) != list:
            return 'Data <%s> must be a list / array.' % (className + 's'), 400
        for idItem in idList:
            if type(idItem) != str:
                return 'Not all data in <%s> is a string' % (className + 's'), 400

        for idItem in idList:
            item = Class.get_or_none(Class.id == idItem)
            if not item:
                return '%s \'%s\' does not exists' % (className, idItem), 400

        uniqueIdList = list(set(idList))
        if len(uniqueIdList) != len(idList):
            return 'There is duplicated data <%s>' % (className + 's'), 400
        return 'Success', 200

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
